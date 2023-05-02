const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const prifileController = require('../controllers/profileController');
const hotelController = require('../controllers/hotelController');
const {hasUser}=require('../middlewares/guards');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/profile', prifileController);
    app.use('/hotel', hasUser(),hotelController);
}