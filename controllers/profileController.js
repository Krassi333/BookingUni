const router = require('express').Router();
const { hasUser } = require('../middlewares/guards');
const { getByUserBooking } = require('../services/hotelService');

router.get('/', hasUser(), async (req, res) => {
    const bookings = await getByUserBooking(req.user.id);

    res.render('profile', {
        title: "Profile Page",
        user: Object.assign({ bookings }, req.user)
    })
})

module.exports = router;