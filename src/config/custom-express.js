const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('marko/node-require').install();
require('marko/express');

app.use(bodyParser.urlencoded( {
    extended: true
}));

const rotas = require('../app/rotas/rotas.js');
rotas(app);

module.exports = app;