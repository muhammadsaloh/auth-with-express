const bcrypt = require('bcrypt');

async function generateHash (data) {
    let salt = await bcrypt.genSaltSync(10)
    let hash = await bcrypt.hashSync(data, salt)
    return hash
};

async function checkHash (data, hash) {
    return await bcrypt.compare(data, hash)
};


module.exports = {
    generateHash, checkHash
};