// initializing dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//connecting to the database
mongoose.connect(config.database, { useNewUrlParser: true });

//on Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to the database '+config.database);
})

//checking if error exist
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
})

const app = express();

const users = require('./routes/users');

const port = 3000;

//setting up middlewares

//CORS middleware
app.use(cors());

//BodyParser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Set Static Folder [ClientSide]
app.use(express.static(path.join(__dirname, 'public')));

//initializing users routes
app.use('/users', users);


//setting home page request
app.get('/', (req, res) => {
    res.send('Endpoint not set yet');
});

//setting up my port
app.listen(port, () => {
    console.log('Server started on port '+ port);
});