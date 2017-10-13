//Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

//DB setup
const url = "mongodb://localhost/auth/auth"||process.env.DATABASEURL;
mongoose.connect(url);
  
//App setup
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({type:"*/*"}));
router(app);


//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on ", port);
