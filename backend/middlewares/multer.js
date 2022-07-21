const multer = require('multer');
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) =>{
        if (file.mimetype.includes('image')){
            cb(null, '../backend/images')
        } else {
            cb(null, '../backend/assets')
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
        //console.log(file)
    }
})

const upload = multer({storage: fileStorageEngine})


module.exports = upload