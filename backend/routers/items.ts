import { validateItem, validateQueryParams } from '../middleware';
import { createItem, deleteItemById, QueryParams, updateItem } from '../model/model';
import { getItems } from '../model/model';
import { Request, Response } from 'express';
import upload from '../upload';
const express = require('express');
var router = express.Router();


router.get('/', validateQueryParams, (req: Request & { queryParams?: QueryParams }, res: Response) => {
    const params = req.queryParams!;

    const result = getItems(params);
    if (!result || result.data.length === 0) {
        return res.status(404).json({ error: 'No items found.' });
    }
    const itemsWithUrls = result.data.map(item => ({
        ...item,
        image: `http://localhost:3000/upload/${item.image}`
    }));
    res.json({
        result: result.result,
        data: itemsWithUrls,
        total: result.total,
        offset: result.offset,
        limit: result.limit
    });

});
router.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }
    const item = getItems({ limit: 1, filter: [{ field: 'id', value: id }] });
    if (item.data.length === 0) {
        return res.status(404).json({ error: 'Item not found' });
    }
    const itemWithUrl = {
        ...item.data[0],
        image: `http://localhost:3000/upload/${item.data[0].image}`
    };
    res.json({
        status: 'ok',
        message: "Item found successfully",
        item: itemWithUrl
    });
}
);

router.post('/', upload.single("imageFile"), validateItem, (req: Request, res: Response) => {
    console.log("finished validation")
    const { name, description, image } = req.body;
    const newItem = createItem(name, description, image);
    res.status(201).json({
        status: 'ok',
        message: "Item added successfully",
        newItem: {
            ...newItem,
            image: `http://localhost:3000/upload/${newItem.image}`
        }
    });
}
);

router.put('/:id', upload.single("imageFile"), validateItem, (req: Request, res: Response) => {
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
        updatedItem: {
            ...updatedItem,
            image: `http://localhost:3000/upload/${updatedItem.image}`
        }
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

