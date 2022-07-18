const multer = require('multer');
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, '../backend/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
        console.log(file)
    }
})

const upload = multer({storage: fileStorageEngine})


module.exports = upload