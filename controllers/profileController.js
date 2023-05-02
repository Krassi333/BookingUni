const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('profile', {
        title: "Profile Page"
    })
})

module.exports = router;