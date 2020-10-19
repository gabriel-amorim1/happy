import multer from 'multer';
import path from 'path';
import { HttpError } from '../errors/HttpError';

const extensions = ['image/png', 'image/jpg', 'image/jpeg'];

export default {
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: (request, file, cb) => {
            if(!extensions.includes(file.mimetype)) 
                cb(new HttpError(400, 'formats file accepted are: png, jpg, jpeg'), 'not accepted format');

            const fileName = `${Date.now()}-${file.originalname}`;

            cb(null, fileName);
        },
    })
};
