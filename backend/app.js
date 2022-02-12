const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const routes = require('./Routes');

const port = 5454;
const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


//to handle the incoming requests

app.use('/', routes);

//connect to MongoDB

mongoose.connect (
    'mongodb+srv://root:india123123@cluster0.xnlfb.mongodb.net/hrm?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(resp =>{
    console.log('Connected to Mongo DB !');
    app.listen(port, (err) => {
        if (!err) {
            console.log(`Server up and running on port : ${port}`);
        }
    } )
})
.catch(err => {
    console.log('Error connecting to MongoDB : ' + err);
})




