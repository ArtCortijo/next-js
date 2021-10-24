// Document JS allows you to customize the entire HTML document. So all the elements that make up an HTML document. If you need to do that, you can add to the _documented JS file. And then you need to add a special component in there, a class-based component, as it turns out, which you could name my document and it has to be a class-based component because it must extend some component offered and provided by next JS

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return(
      // This is the basic structure if you need to edit the overall HTML document (in _app.js) :
      // <Html>
      //   <Head />
      //   <body>
      //     <Main />
      //     <NextScript />
      //   </body>
      // </Html>

      <Html lang="en">
        <Head />
        <body>
          <div id="overlays" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;