import { validateItem, validateQueryParams } from '../middleware';
import { createItem, deleteItemById, QueryParams, updateItem } from '../model/model';
import { getItems } from '../model/model';
import { Request, Response, NextFunction } from 'express';
import upload from '../upload';
const express = require('express');
var router = express.Router();

router.get('/', validateQueryParams, (req: Request & { queryParams?: QueryParams }, res: Response) => {
    const params = req.queryParams!;
    const result = getItems(params);
    if (!result || result.data.length === 0) {
        return res.status(404).json({
            result: 'error',
            errors: [{ status: 404, title: 'Not Found', details: 'No items found' }]
        });
    }
    const itemsWithUrls = result.data.map(item => ({
        ...item,
        image: `http://localhost:3000/upload/${item.image}`
    }));
    res.json({
        result: 'ok',
        data: itemsWithUrls,
        total: result.total,
        offset: result.offset,
        limit: result.limit
    });
});

router.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({
            result: 'error',
            errors: [{ status: 400, title: 'Bad Request', details: 'Invalid ID' }]
        });
    }
    const item = getItems({ limit: 1, filter: [{ field: 'id', value: id }] });
    if (item.data.length === 0) {
        return res.status(404).json({
            result: 'error',
            errors: [{ status: 404, title: 'Not Found', details: 'Item not found' }]
        });
    }
    const itemWithUrl = {
        ...item.data[0],
        image: `http://localhost:3000/upload/${item.data[0].image}`
    };
    res.json({
        result: 'ok',
        message: 'Item found successfully',
        item: itemWithUrl
    });
});

// Middleware to conditionally apply multer for PUT requests
const conditionalUpload = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers['content-type']?.startsWith('multipart/form-data')) {
        upload.single('imageFile')(req, res, (err) => {
            if (err) {
                return res.status(400).json({
                    result: 'error',
                    errors: [{ status: 400, title: 'Bad Request', details: 'Error processing file upload: ' + err.message }]
                });
            }
            next();
        });
    } else {
        next();
    }
};

router.post('/', upload.single('imageFile'), validateItem, (req: Request, res: Response) => {
    console.log('Finished validation');
    const { name, description, category, image } = req.body;
    const imageFile = req.file;

    if (!name || !description || !image) {
        return res.status(400).json({
            result: 'error',
            errors: [{ status: 400, title: 'Validation Error', details: 'Missing required fields' }]
        });
    }

    const newImage = imageFile
        ? `/upload/${imageFile.originalname}`
        : image.startsWith('http://localhost:3000/upload/') ? image.replace('http://localhost:3000/upload/', '') : image;

    const newItem = createItem(name, description, category, newImage);
    if (!newItem) {
        return res.status(500).json({
            result: 'error',
            errors: [{ status: 500, title: 'Server Error', details: 'Failed to create item' }]
        });
    }

    res.status(201).json({
        result: 'ok',
        message: 'Item added successfully',
        newItem: {
            ...newItem,
            image: `http://localhost:3000/upload/${newItem.image}`
        }
    });
});

router.put('/:id', conditionalUpload, validateItem, (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({
            result: 'error',
            errors: [{ status: 400, title: 'Bad Request', details: 'Invalid ID' }]
        });
    }

    const { name, description, category, image } = req.body;
    const imageFile = req.file;

    if (!name || !description || !image) {
        return res.status(400).json({
            result: 'error',
            errors: [{ status: 400, title: 'Validation Error', details: 'Missing required fields' }]
        });
    }

    const newImage = imageFile
        ? `/upload/${imageFile.originalname}`
        : image.startsWith('http://localhost:3000/upload/') ? image.replace('http://localhost:3000/upload/', '') : image;

    const updatedItem = updateItem(id, { name, description, category, image: newImage });
    if (!updatedItem) {
        return res.status(404).json({
            result: 'error',
            errors: [{ status: 404, title: 'Not Found', details: 'Item not found' }]
        });
    }

    res.json({
        result: 'ok',
        message: 'Item updated successfully',
        updatedItem: {
            ...updatedItem,
            image: `http://localhost:3000/upload/${updatedItem.image}`
        }
    });
});

router.delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({
            result: 'error',
            errors: [{ status: 400, title: 'Bad Request', details: 'Invalid ID' }]
        });
    }

    const deleted = deleteItemById(id);
    if (!deleted) {
        return res.status(404).json({
            result: 'error',
            errors: [{ status: 404, title: 'Not Found', details: 'Item not found' }]
        });
    }

    res.json({
        result: 'ok',
        message: 'Item deleted successfully'
    });
});

export default router;