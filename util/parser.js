function parseError(error) {

    if (error.name == 'ValidationError') {
        console.log(error);
        return Object.values(error.errors).map(v => v.message);
    } else {
        return error.message.split('\n');
    }


}

module.exports = {
    parseError
}