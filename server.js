const express = require('express');
const morgan = require('morgan');
const app = express();
const dotenv = require('dotenv');
const path = require ('path');
const connectDB = require('./server/database/connection');


dotenv.config({ path: 'config.env'});

//log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//set view engine
app.set("view engine", "ejs");

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));


//load routeur
app.use('/', require('./server/routes/router'));   

//listening app on localhost on port 3000
app.listen(3000,()=> {console.log('Server is running on http://localhost:3000')});