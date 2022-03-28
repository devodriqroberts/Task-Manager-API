const multer = require('multer');

const upload = multer({
    limits: {
        fileSize: 1_000_000, // 1MB
    },
    fileFilter(req, file, cb) { // File Type Filter
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload an image."))
        }
        cb(undefined, true)
    }
})

module.exports = upload