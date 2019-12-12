const express = require('express')
const app = express()

if(process.env.ENV === 'development'){
	require.extensions['.scss'] = () => {};
	console.log('registering ')
	require("@babel/core").transform("code", {
		plugins: ["@babel/plugin-proposal-optional-chaining"]
	  });
}

const renderToString = require('./serveHTML')

app.get('*', renderToString)

const server = app.listen(process.env.PORT || 9090, () => {
	const host = server.address().address
	const port = server.address().port
	console.log(`serving at ${host} & port : ${port}`)
})
