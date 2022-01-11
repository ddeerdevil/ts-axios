const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const route = express.Router();

const cors = {
    'Access-Control-Allow-Origin': 'http://localhost:8082',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  }

route.post('/more/server2', function(req, res) {
    res.set(cors);
    res.json(req.cookies);
});

route.options('/more/server2', function(req, res) {
    res.set(cors);
    res.end();
});

app.use(route);

const port = 8088;
module.exports = app.listen(port);