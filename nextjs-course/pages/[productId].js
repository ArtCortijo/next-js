import path from 'path';
import fs from 'fs/promises';

import { Fragment } from 'react';

function ProductDetailPage (props) {
  const { loadedProduct } = props;

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  )
}

// we can use this context parameter, which is exposed to us buying Next.js, to get hold of the concrete param values. So the concrete values for these dynamic segments in our paths.
export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.productId;

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data =JSON.parse(jsonData);

  const product = data.products.find(product => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    }
  }
}

// We need getStaticPaths because this a dynamic page. The goal of this function is to tell Next.js which instances of this dynamic page should be generated.
export async function getStaticPaths() {
  return {
    paths: [
      { params: { productId: 'p1' } },
      { params: { productId: 'p2' } },
      { params: { productId: 'p3' } },
      { params: { productId: 'p4' } },
    ], 
    fallback: false
  }
}

export default ProductDetailPage;
