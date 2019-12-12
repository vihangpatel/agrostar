import React from "react";
import ReactDOMServer from "react-dom/server";
import Head from "./head";

import App from "../client";

const HTML = ({ host }) => (
  <html lang="en">
    <Head />
    <body>
      <div id="root-app">
        <App />
      </div>
    </body>
    {process.env.ENV === 'development' && <script type="text/javascript" src={`http://${host}:9091/client.dev.js`} />}
  </html>
);

module.exports = (req, res) => {

  const host = req.get('host').split(':')[0]
  // render to string the outer shell of the application
  const htmlString = ReactDOMServer.renderToString(<HTML host={host}/>);

  console.log("request is coming");
  res.send(htmlString);
};
