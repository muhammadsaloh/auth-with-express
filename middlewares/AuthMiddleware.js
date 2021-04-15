const users = require('../data/data')

const {
    checkToken
} = require('../modules/jwt')

module.exports = async (req, res, next) => {

    if(!req?.user?.name){
        res.redirect('/')
        return 0
    }

    next()
}   