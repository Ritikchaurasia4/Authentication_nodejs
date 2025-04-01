import multer from 'multer'    // it take the file from frontend and send it to backend/diskStorage

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.originalname)
    }
})

export const upload = multer({storage});    // this upload is used in routes to upload the file from frontend to backend

