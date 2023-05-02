const router = require('express').Router();
const validator = require('validator');
const { register, login } = require('../services/userServices');
const { parseError } = require('../util/parser');

router.get('/register', (req, res) => {
    res.render('register', {
        title: "Register Page"
    })
});

router.post('/register', async (req, res) => {
    try {
        if (!validator.isEmail(req.body.email)) {
            throw new Error('You should enter valid email!');
        }

        if (req.body.username == '' || req.body.password == '') {
            throw new Error('All fields are required!');
        }


        if (req.body.password.length < 5) {
            throw new Error('Password muxt be at least 5 characters long!');
        }

        if (req.body.password != req.body.repass) {
            console.log(req.body.password);
            console.log(req.body.repass);

            throw new Error('Passwords don\'t match!');
        }
        //TODO check if register creates session 
        const token = await register(req.body.email, req.body.username, req.body.password);

        res.cookie('token', token);

        res.redirect('/');  //TODO replace with redirect by assignment
    } catch (err) {

        const errors = parseError(err);
console.log(errors);
        //TODO Add error mesage to actual template 
        res.render('register', {
            title: "Register Page",
            errors,
            body: {
                email: req.body.email
            }
        })
    }
});

router.get('/login', (req, res) => {
    res.render('login', {
        title: "Login Page"
    })
});

router.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);

        res.cookie('token', token);

        res.redirect('/'); //TODO replace with redirect by assignment
    } catch (err) {
        const errors = parseError(err);
//console.log(errors);
        res.render('login', {
            title: "Login Page",
            errors,
            body: {
                email: req.body.email
            }
        })
    }
});

module.exports = router;