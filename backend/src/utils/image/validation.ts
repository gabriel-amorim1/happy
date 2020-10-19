import { HttpError } from "../../errors/HttpError";

const extensions = ['image/png', 'image/jpg', 'image/jpeg'];

export const imageValidation = (files: Express.Multer.File[]) => {
    files.forEach(element => {
        if (files.length === 0) throw new HttpError(400, 'files is a required field');

        if(!extensions.includes(element.mimetype)) throw new HttpError(400, 'extensions file accepted are: png, jpg, jpeg');
    });
};