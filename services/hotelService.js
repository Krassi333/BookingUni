const Hotel = require("../models/Hotel")

async function getAll() {
    return Hotel.find({}).lean();
}

async function getById(id) {
    return Hotel.findById(id).lean();
}

async function create(hotel) {
    return await Hotel.create(hotel);
}

async function update(id, hotel) {

}

async function deleteById(id) {

}

async function bookRoom(hotelId, userId) {

}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    bookRoom
}