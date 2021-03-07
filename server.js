const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

app.use('/', serveStatic(path.join(__dirname, '/dist')))

app.listen(process.env.PORT || 8080, () => {
    console.log(`Listening on port: ${process.env.PORT || 8080}`);
});