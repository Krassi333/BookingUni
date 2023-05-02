const { Schema, model } = require('mongoose');

//TODO Add User properties and validations acording to the assignment
const userSchema = new Schema({
    email: { type: String, reguired: true, unique: true },
    username: { type: String, required: true },
    hashedPassword: { type: String, required: true }
});

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;