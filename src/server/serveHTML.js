import React from "react";
import ReactDOMServer from "react-dom/server";
import Head from "./head";

import stats from "./stats.json";

import App from "../client";

const isDev = process.env.ENV === "development"

const HTML = ({ host }) => {
  const [css, js] = isDev ? [] : stats?.assetsByChunkName?.client;

  return (
    <html lang="en">
      <Head />
      <body>
        {css && <link rel="stylesheet" href={css} />}
        <div id="root-app">
          <App />
        </div>
      </body>
      {process.env.ENV === "development" && (
        <script
          type="text/javascript"
          src={`http://${host}:9091/client.dev.js`}
        />
      )}
      {js && <script type="text/javascript" src={js} />}
    </html>
  );
};

module.exports = (req, res) => {
  const host = req.get("host").split(":")[0];
  // render to string the outer shell of the application
  const htmlString = ReactDOMServer.renderToString(<HTML host={host} />);

  console.log("request is coming");
  res.send(htmlString);
};
