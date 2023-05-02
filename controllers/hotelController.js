const { create, getById } = require('../services/hotelService');
const { parseError } = require('../util/parser');


const router = require('express').Router();

router.get('/:id/details', async(req, res) => {
    const hotel=await getById(req.params.id);

    res.render('details', {
        title: "Hotel Details",
        hotel
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: "Create Hotel"
    })
})

router.post('/create', async (req, res) => {
    const hotel = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: Number(req.body.rooms),
        owner: req.user._id
    }

    //console.log(hotel);
    try {
        if (Object.values(hotel).some(v => !v)) {
            throw new Error('All fields are required!');
        }

        await create(hotel);
        res.redirect('/');
    } catch (err) {
        const errors = parseError(err);

        res.render('create', {
            title: "Create Hotel",
            errors,
            body: hotel
        })
    }
    
})

router.get('/:id/edit', (req, res) => {
    res.removeHeader('edit', {
        title: "Edit Hotel"
    })
})

module.exports = router;