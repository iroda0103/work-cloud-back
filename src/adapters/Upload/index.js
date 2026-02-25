const fs = require('fs/promises')
// const multer = require('multer')
const path = require('path')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(process.cwd(), 'temp'))
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
//         cb(
//             null,
//             `${file.fieldname}-${uniqueSuffix}${path.extname(
//                 file.originalname
//             )}`
//         )
//     },
// })

// const Upload = multer({ storage: storage })


// Upload.removeTemp = (filename) => {
//     return fs.unlink(path.join(process.cwd(), 'temp', filename))
// }
// Upload.save = (filename) => {
//     const oldPath = path.join(process.cwd(), 'temp', filename)
//     const newPath = path.join(process.cwd(), 'uploads', filename)
//     return fs.rename(oldPath, newPath)
// }
// Upload.isDefaultAvatar = (filename) => {
//     return filename === 'default-avatar.png'
// }

// module.exports = Upload
const multer = require('multer');

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create the multer instance
const upload = multer({ storage: storage });
upload.remove = (filename) => {
    // return fs.unlink(path.join(process.cwd(), 'uploads', filename))
}

module.exports = upload;

