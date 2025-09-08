import multer, { StorageEngine, FileFilterCallback } from 'multer';
import { Request } from 'express';
import fs from 'fs';

const storage: StorageEngine = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
    ) => {
        const uploadDir = 'upload/';
        fs.mkdir(uploadDir, { recursive: true }, (err) => {
            if (err) {
                return cb(new Error(`Failed to create upload directory: ${err.message}`), uploadDir);
            }
            cb(null, uploadDir);
        });
    },
    filename: (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, filename: string) => void
    ) => {
        const extension = file.originalname.split('.').pop();
        const image = req.body.image
            ? `${req.body.image}.${extension}`
            : file.originalname;
        cb(null, image);
    }
});

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = file.originalname.split('.').pop()?.toLowerCase();
    if (extension && allowedExtensions.includes(extension)) {
        cb(null, true);
    } else {
        cb(null, false); // No error, just reject the file
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
        fields: 10, // Limit number of non-file fields
        files: 1, // Limit to 1 file per request
    }
});

export default upload;