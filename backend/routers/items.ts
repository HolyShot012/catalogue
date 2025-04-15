import { validateItem, validateQueryParams } from '../middleware';
import { createItem, deleteItemById, QueryParams, updateItem } from '../model/model';
import { getItems } from '../model/model';
import multer from 'multer';
import { Request, Response } from 'express';
const express = require('express');
var router = express.Router();

const storage = multer.diskStorage({
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
        const imageName = req.body.imageName || `item${Date.now()}.${file.originalname.split('.').pop()}`;
        cb(null, imageName);
    }
});
const upload = multer({ storage })

router.get('/', validateQueryParams, (req: Request & { queryParams?: QueryParams }, res: Response) => {
    const params = req.queryParams!;

    const result = getItems(params);
    if (!result || result.data.length === 0) {
        return res.status(404).json({ error: 'No items found.' });
    }
    console.log(result)
    res.json(result);

});

router.post('/', upload.single("image"), validateItem, (req: Request, res: Response) => {
    console.log("finished validation")
    const { name, description, image } = req.body;
    const newItem = createItem(name, description, image);
    console.log("newItem", newItem)

    res.status(201).json({
        status: 'ok',
        message: "Item added successfully",
        newItem
    });
}
);

router.put('/:id', upload.single("image"), validateItem, (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }
    const { name, description, image } = req.body;
    const updatedItem = updateItem(id, { name, description, image });
    if (!updatedItem) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.json({
        status: 'ok',
        message: "Item updated successfully",
        updatedItem
    });
}
);
router.delete('/', validateItem, (req: Request, res: Response) => {
    const { name, description, image } = req.body;
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

}
);

router.delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }
    const deleted = deleteItemById(id);
    if (!deleted) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.json({
        status: 'ok',
        message: "Item deleted successfully",
    });
})

export default router

