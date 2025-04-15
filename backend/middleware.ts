import { Request, Response, NextFunction } from 'express';

import { QueryParams } from './model/model'; // Assuming you have a types file for your query parameters

interface QueryRequest extends Request {
    queryParams?: QueryParams;
}

//check arguments from GET method : offset, limit, sort, filter
const validateQueryParams = (req: QueryRequest, res: Response, next: NextFunction) => {
    const offset = parseInt(req.query.offset as unknown as string, 10) || 0;
    const limit = parseInt(req.query.limit as unknown as string, 10) || 10;
    if (offset < 0 || limit <= 0 || limit > 100) {
        return res.status(400).json({ error: 'Invalid pagination parameters' });
    }
    const queryParams: QueryParams = {
        offset: offset,
        limit: limit,
    }
    if (req.query.sort) {
        const sort = req.query.sort as { [key: string]: string }
        const field = Object.keys(sort)[0]
        const order = sort[field]
        if (order !== 'asc' && order !== 'desc') {
            return res.status(400).json({ error: 'Invalid sort order' });
        }
        queryParams.sort = {
            field: field,
            order: order
        }
    }
    if (req.query.filter) {
        const filteredValues = Array.isArray(req.query.filter) ? req.query.filter : [req.query.filter]
        queryParams.filter = filteredValues.map(value => ({
            field: 'name',
            value: value as string
        }))

        for (const filter of queryParams.filter) {
            if (!filter.value) {
                return res.status(400).json({ error: 'Invalid filter value' });

            }
        }

    }
    req.queryParams = queryParams;
    next();
}

const validateItem = (req: Request, res: Response, next: NextFunction) => {
    const { name, description, image } = req.body;
    if (!name || !description || !image) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    if (typeof name !== 'string' || typeof description !== 'string' || typeof image !== 'string') {
        return res.status(400).json({ error: 'Invalid field types' });
    }

    next();
}

const validateId = (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    next();
}
export {
    validateQueryParams,
    validateId,
    validateItem
};