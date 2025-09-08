import { Request, Response, NextFunction } from 'express';
import { QueryParams } from './model/model';

interface QueryRequest extends Request {
    queryParams?: QueryParams;
}

const validateQueryParams = (req: QueryRequest, res: Response, next: NextFunction) => {
    const offset = parseInt(req.query.offset as unknown as string, 10) || 0;
    const limit = parseInt(req.query.limit as unknown as string, 10) || 10;
    if (offset < 0 || limit <= 0 || limit > 100) {
        return res.status(400).json({
            result: 'error',
            errors: [{ status: 400, title: 'Bad Request', details: 'Invalid pagination parameters' }]
        });
    }

    const queryParams: QueryParams = {
        offset: offset,
        limit: limit,
    };

    if (req.query.sort) {
        const sort = req.query.sort as { [key: string]: string };
        const field = Object.keys(sort)[0];
        const order = sort[field];
        if (order !== 'asc' && order !== 'desc') {
            return res.status(400).json({
                result: 'error',
                errors: [{ status: 400, title: 'Bad Request', details: 'Invalid sort order' }]
            });
        }
        queryParams.sort = {
            field: field,
            order: order
        };
    }

    if (req.query.filter) {
        const filteredValues = Array.isArray(req.query.filter) ? req.query.filter : [req.query.filter];
        queryParams.filter = filteredValues.map(value => {
            if (typeof value === 'object' && 'field' in value && 'value' in value) {
                return value as { field: string; value: string | number };
            }
            return { field: 'name', value: value as string };
        });

        for (const filter of queryParams.filter) {
            if (!filter.value && filter.value !== 0) { // Allow 0 as a valid value
                return res.status(400).json({
                    result: 'error',
                    errors: [{ status: 400, title: 'Bad Request', details: 'Invalid filter value' }]
                });
            }
        }
    }

    // Handle category query parameter
    if (req.query.category) {
        const categories = Array.isArray(req.query.category)
            ? req.query.category.map(cat => (typeof cat === 'string' ? cat : String(cat)))
            : [typeof req.query.category === 'string' ? req.query.category : String(req.query.category)];
        queryParams.filter = queryParams.filter || [];
        queryParams.filter.push({ field: 'category', value: categories });
    }

    req.queryParams = queryParams;
    next();
};

const validateItem = (req: Request, res: Response, next: NextFunction) => {
    const { name, description, image, category } = req.body;

    if (!name || !description || !image) {
        return res.status(400).json({
            result: 'error',
            errors: [{ status: 400, title: 'Validation Error', details: 'Missing required fields' }]
        });
    }

    if (typeof name !== 'string' || typeof description !== 'string' || typeof image !== 'string') {
        return res.status(400).json({
            result: 'error',
            errors: [{ status: 400, title: 'Validation Error', details: 'Invalid field types' }]
        });
    }

    if (category !== undefined) {
        if (typeof category !== 'string' && !Array.isArray(category)) {
            return res.status(400).json({
                result: 'error',
                errors: [{ status: 400, title: 'Validation Error', details: 'Category must be a string or array of strings' }]
            });
        }
        const validCategories = ['Piston', 'Rings', 'Valves'];
        const categoriesToCheck = Array.isArray(category) ? category : [category];
        if (categoriesToCheck.some(cat => typeof cat !== 'string' || !validCategories.includes(cat))) {
            return res.status(400).json({
                result: 'error',
                errors: [
                    {
                        status: 400,
                        title: 'Validation Error',
                        details: `Category must be one of: ${validCategories.join(', ')}`
                    }
                ]
            });
        }
    }

    next();
};

const validateId = (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            result: 'error',
            errors: [{ status: 400, title: 'Bad Request', details: 'Invalid ID' }]
        });
    }

    next();
};

export { validateQueryParams, validateId, validateItem };