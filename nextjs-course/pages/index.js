import path from 'path';
// The fs (filesystem) imports the file system module from node JS. This is not a third party package
import fs from 'fs/promises';

function HomePage(props) {
  const { products } = props;
  console.log(products);
  
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
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
    console.log('Re-Generating...');
    // this path will lead to the dummy backend json file.
  // tell path join in which path we're starting. Get to the current directory by using node js object or concept -> the process object which is globally available in node js.
  // The process.cwd() method returns the current working directory (cwd) of the Node.js process.
  // IMPORTANT: this cwd will not be the pages folder. Instead when the file is executed, next js will be executing it and it will be treat all the files as if they were at the root project folder.
  // So the current working directory will be the overall project folder instead of the pages folder.
  // The next argument is data because we wanna dive into the data folder.
  // Then the file name we wanna use
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  // readFile wants a callback to conintue. It returns a promise
  const jsonData = await fs.readFile(filePath);
  // To get the actual data. The parse(jsonData) converts it into regular js object.
  const data =JSON.parse(jsonData);

  // revalidate -> next JS goes ahead and pre-renders pages. But it will now also do this Incremental Static Regeneration (ISR). In this example, the starting page (index) should be regenerated every 60 seconds no matter how many loads or reloads within those 60 seconds.
  return { 
    props: {
      products: data.products
    },
    revalidate: 60
  };
}

export default HomePage;
