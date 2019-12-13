const express = require("express");
const app = express();
const path = require("path");

require.extensions[".scss"] = () => {};

if (process.env.ENV === "development") {
  require("@babel/core").transform("code", {
    plugins: ["@babel/plugin-proposal-optional-chaining"]
  });
} else {
  const mountPath = path.join(__dirname, "..", "..", "build");
  console.log("Mouting on path:", mountPath);
  app.use(
    express["static"](mountPath, {
      maxAge: 365 * 24 * 60 * 60
    })
  );
}

const renderToString = require("./serveHTML");

app.get("*", renderToString);

const server = app.listen(process.env.PORT || 9090, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`serving at ${host} & port : ${port}`);
});
