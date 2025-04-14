import { validateCreateItem, validateItem, validateQueryParams } from '../middleware';
import { createItem, QueryParams, updateItem } from '../model/model';
import { getItems } from '../model/model';
import { Request, Response } from 'express';
const express = require('express');
var router = express.Router();

router.get('/', validateQueryParams, (req: Request & { queryParams?: QueryParams }, res: Response) => {
    const params = req.queryParams!;

    const result = getItems(params);
    if (!result || result.data.length === 0) {
        return res.status(404).json({ error: 'No items found.' });
    }
    console.log(result)
    res.json(result);

});

router.post('/', validateCreateItem, (req: Request, res: Response) => {
    console.log("finished validation")
    const { name, description, image } = req.body;
    const newItem = createItem(name, description, image);
    console.log("newItem", newItem)

    res.status(201).json(newItem);
}
);

router.put('/:id', validateItem, (req: Request, res: Response) => {
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
// router.delete('/', (req, res, next) => {
//     res.send('respond with a resource');
// }
// );

export default router

