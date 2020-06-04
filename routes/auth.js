const router = require('express').Router();
const User = require("../models/User.js");
const Elective = require("../models/Elective.js");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const saltRounds = 12;

router.use(bodyParser.urlencoded({
    extended: true
  }));
router.use(bodyParser.json());

router.post("/login", async (req, res) => {

    const { username, password } = req.body;
    try{
        const user = await User.query().select().where({username: username});
        bcrypt.compare(password, user[0].password).then((result) => {
        if (result == true) { 
            req.session.loggedin = true;
            req.session.username = username;
            return res.redirect("/secretpage")
        }
        else{
            return res.redirect("/login");
        }
        });
    }
    catch(error){
        return res.send("No found user")
    }

});

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        // password validation
        if (password.length < 8) {
            return res.status(400).send({ response: "Password must be 8 charecters or longer" });
        } else {
            try {
                User.query().select('username').where('username', username).then(foundUser => {
                    if (foundUser.length > 0) {
                        return res.status(400).send({ response: "User already exists" });
                    } else {
                        bcrypt.hash(password, saltRounds).then(hashedPassword => {
                            User.query().insert({
                                username,
                                password: hashedPassword
                            }).then(createdUser => {
                                return res.redirect("/login");
                            });
                        });
                    }
                });
            } catch (error) {
                return res.status(500).send({ response: "Something went wrong with the Database" });
            }
        }
    } else {
        return res.status(400).send({ response: "Username or Password missing" });
    }
});

router.get('/logout', (req, res) => {
    return res.status(501).send({ response: "Not implemented yet" });
});

module.exports = router;