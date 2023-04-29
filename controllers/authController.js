const router = require('express').Router();
const { register, login } = require('../services/userServices');

router.get('/register', (req, res) => {
    res.render('register', {
        title: "Register Page"
    })
});

router.post('/register', async (req, res) => {
    const token = await register(req.body.username, req.body.password);

    res.cookie('token', token);

    res.redirect('/auth/register');
});

router.get('/login', (req, res) => {
    res.render('login', {
        title: "Login Page"
    })
});

router.post('/login', async (req, res) => {
    const token = await login(req.body.username, req.body.password);

    res.cookie('token', token);

    res.redirect('/auth/register');
});

module.exports = router;