import path from 'path';
import fs from 'fs/promises';

import { Fragment } from 'react';

function ProductDetailPage (props) {
  const { loadedProduct } = props;

  // If fallback: true, you return a fallback while the server fetches the data
  if (!loadedProduct) {
    return <p>Loading...</p>
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  )
}

// Since we normally get the data from a database
async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data =JSON.parse(jsonData);

  return data;
}

// we can use this context parameter, which is exposed to us buying Next.js, to get hold of the concrete param values. So the concrete values for these dynamic segments in our paths.
export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.productId;
  const data = await getData();
  const product = data.products.find(product => product.id === productId);

  // with the notFound & fallback (in getStaticPaths) set to true, it will return the 404 page
  if (!product) {
    return {notFound: true};
  }

  return {
    props: {
      loadedProduct: product,
    }
  }
}

// We need getStaticPaths because this a dynamic page. The goal of this function is to tell Next.js which instances of this dynamic page should be generated.
export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({params: {productId: id}}));

  return {
    paths: pathsWithParams, 
    // fallback: true,
    // You can use blocking as a value and you need to return a fallback like in the condition if (!loadedProduct). It will take slightly more time to load the page content
    fallback: true
  }
}

export default ProductDetailPage;
