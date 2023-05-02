const { getAll } = require('../services/hotelService');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const hotels=await getAll();
    //console.log(hotels);
    res.render('home', {
        title: 'Home Page',
        hotels
    })
});

module.exports = router;