const users = require('../data/data')

const {
    checkToken
} = require('../modules/jwt')

module.exports = async (req, res, next) => {

    let user

    if (req?.cookies?.token) {
        user = checkToken(req.cookies.token)
    }

    if (user) {
        user = users.find(user2 => user2.id == user.user)
    }

    user = {
        id: user?.id || "",
        name: user?.name || "",
        email: user?.email || "",
        age: user?.age || ""
    }
    
    req.user = user

    next()
}   