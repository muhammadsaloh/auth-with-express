const express = require('express')
const router = express.Router()
const expressFileUpload = require('express-fileupload')
const fs = require('fs').promises
const fsOld = require('fs')
const path = require('path')

const AuthMiddleware = require('../middlewares/AuthMiddleware')

router.use(AuthMiddleware)

router.get('/', (req, res) => {
    let photosFolderPath = path.join(__dirname, "..", "public", "photos", `${req.user.id}.jpg`)
    let exist = fsOld.existsSync(photosFolderPath)
    res.render("users", {
        title: "User Page",
        path: '/user',
        user: {
            ...req.user,
            photo: exist ? `../public/photos/${req.user.id}.jpg` : "https://picsum.photos/400" 
        }
    })
})

router.post('/photo', expressFileUpload(), async (req, res) => {
    if(req?.files?.photo) {
        let photosFolderPath = path.join(__dirname, "..", "public", "photos", `${req.user.id}.jpg`)
        await fs.writeFile(photosFolderPath, req?.files?.photo?.data)
    } else {
        res.send({
            ok: false
        })
        return 0
    }
    res.send({
        ok: true
    })
})


module.exports = {
    path: '/user',
    router: router
}

