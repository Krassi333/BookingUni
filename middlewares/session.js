const { verifyToken } = require("../services/userServices")

module.exports = () => (req, res, next) => {
    const token = req.cookies.token;
    //console.log("token: "+token);
    if (token) {
        try {
            const userData = verifyToken(token);
            req.user = userData;
            res.locals.username = userData.username;
        } catch (err) {
            res.clearCookie('token');
            res.redirect('/auth/login');
            return;
        }
    }

    next();
}