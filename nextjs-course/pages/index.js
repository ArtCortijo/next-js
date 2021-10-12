function HomePage(props) {
  const { products } = props;
  console.log(products);
  return (
    <ul>
      {products.map(product => <li key={product.id}>{product.title}</li>)}
    </ul>
  );
}

// pre-fetch the data before we create this component (from dummy-backend.json in the data folder) And before this component page gets pre rendered by next JS. 
// For that we must add the getStaticProps(). ***It must always be named getStaticProps*** 
// And actually what this function does is it prepares the props for your component. So it will execute getStaticProps first and then the component function (HomePage(props))
// and therefore in this get static props function. You can run any code you want.
// Again code that will never be visible on the client site that fetches data, and exposes data through props to this homepage component.
// the getStaticProps must always return an object with a props key
export async function getStaticProps() {
  return { props: {
    products: [{
      id: 'p1',
      title: 'Product 1'
    }]
  }};
}

export default HomePage;
