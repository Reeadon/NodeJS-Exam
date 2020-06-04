const express = require('express');
const app = express();

app.use(express.json());

const session = require('express-session');

const config = require('./config/config.json');

app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true
}));

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.use('/signup', limiter);
app.use('/login', limiter);


/* Setup Knex with Objection */

const { Model } = require('objection');
const Knex = require('knex');
const knexfile = require('./knexfile.js');

const knex = Knex(knexfile.development);

Model.knex(knex);

const authRoute = require('./routes/auth.js');
const usersRoute = require('./routes/users.js');
const nodeMailRoute = require('./routes/nodemail.js');

app.use(authRoute);
app.use(usersRoute);
////app.use(nodeMailRoute);


app.get("/", (req, res) => {
    return res.sendFile(__dirname + "/public/login.html");
}); 

app.get("/login", (req, res) => {
    return res.sendFile(__dirname + "/public/login.html");
});

app.get("/signup", (req, res) => {
    return res.sendFile(__dirname + "/public/signup.html");
});

app.get("/secretpage", (req, res) => {
    if (req.session.loggedin) {
        res.sendFile(__dirname + "/public/secretpage.html");
    } else {
        res.send('You need to be logged in to view this page.');
    }
});

app.get("/secretpagetwo", (req, res) => {
    if (req.session.loggedin) {
        res.sendFile(__dirname + "/public/secretpagetwo.html");
    } else {
        res.send('You need to be logged in to view this page.');
    }
});

app.get("/nodemail", (req, res) => {
    if (req.session.loggedin) {
        res.sendFile(__dirname + "/public/nodemail.html");
    } else {
        res.send('You need to be logged in to view this page.');
    }
});

const PORT = 3000;

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on the port", PORT);
})