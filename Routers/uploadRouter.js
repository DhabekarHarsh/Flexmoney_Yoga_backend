import express from 'express';
import multer from 'multer';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/');
    },
    filename(req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}.jpg`)
    },
});

const upload = multer({
    storage,
    limits: {fileSize: 1000000},
});

uploadRouter.post('/', upload.array('images', 1), (req, res) => {
    const files = req.files;
    if(!files){
        console.log('No files')
    }

    res.send(files);

});

export default uploadRouter;