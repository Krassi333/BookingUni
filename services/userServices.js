const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const secret = 'erdfcv67gbl';

async function register(email, username, password) {
    const existingUsername = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existingUsername) {
        throw new Error('Username is taken!');
    }

    const existingEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (existingEmail) {
        throw new Error('Email is taken!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        username,
        hashedPassword
    });
    //TODO check if registation creates session by assignment
    const token = createSesion(user);

    return token;
}

async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    console.log('user : '+user);

    if (!user) {
        throw new Error('Incorect email or password!');
    }

    const passwordCheck = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordCheck) {
        throw new Error('Incorect email or password!');
    }

    const token = createSesion(user);
    return token;
}

async function logout() {

}

function verifyToken(token) {
    return jwt.verify(token, secret);
}

function createSesion({ _id, email, username }) {
    const payload = {
        _id,
        email,
        username
    }

    const token = jwt.sign(payload, secret);

    return token;
}

module.exports = {
    register,
    login,
    logout,
    verifyToken
}