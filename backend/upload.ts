import multer, { StorageEngine, FileFilterCallback } from 'multer';
import { Request } from 'express';

const storage: StorageEngine = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
    ) => {
        cb(null, 'upload/');
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
        // Explicitly cast to satisfy TypeScript
        cb(null, false);
    }
};

const upload = multer({
    storage,
    fileFilter
});

export default upload;