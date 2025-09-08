interface QueryParams {
    offset?: number;
    limit?: number;
    sort?: {
        field: string;
        order: 'asc' | 'desc';
    };
    filter?: {
        field: string;
        value: string | number | (string | number)[];
    }[];
}

interface Item {
    id: number;
    name: string;
    description: string;
    category?: string;
    image: string;
}

interface ItemResponse {
    result: string;
    data: Item[];
    total: number;
    offset: number;
    limit: number;
}

let mockData: Item[] = [];
for (let i = 1; i <= 100; i++) {
    mockData.push({
        id: i,
        name: `Item ${i}`,
        description: `Description for item ${i}`,
        category: i % 3 === 0 ? 'Piston' : i % 3 === 1 ? 'Rings' : 'Valves',
        image: `temp.png`
    });
}

let nextId = mockData.length + 1;

const getItems = (params: QueryParams): ItemResponse => {
    let result = [...mockData];

    if (params.filter) {
        result = result.filter(item =>
            params.filter!.every(filter => {
                const fieldValue = item[filter.field as keyof Item];
                if (Array.isArray(filter.value)) {
                    return filter.value.includes(fieldValue as string | number);
                }
                return fieldValue === filter.value;
            })
        );
    }

    if (params.sort) {
        const { field, order } = params.sort;
        result.sort((a, b) => {
            const aValue = a[field as keyof Item];
            const bValue = b[field as keyof Item];

            // Handle undefined values: undefined sorts after defined values
            if (aValue === undefined && bValue === undefined) return 0;
            if (aValue === undefined) return 1; // a comes after b
            if (bValue === undefined) return -1; // b comes after a

            // Both values are defined, proceed with comparison
            if (aValue < bValue) return order === 'asc' ? -1 : 1;
            if (aValue > bValue) return order === 'asc' ? 1 : -1;
            return 0;
        });
    }

    const offset = params.offset || 0;
    const limit = params.limit || 10;
    if (offset >= 0) {
        result = result.slice(offset, offset + limit);
    }

    return {
        result: 'ok',
        data: result,
        total: mockData.length,
        offset: offset,
        limit: limit
    };
};

const baseUrl = 'http://localhost:3000/upload/';

const createItem = (name: string, description: string, category: string | undefined, image: string): Item => {
    const cleanImage = image.startsWith(baseUrl) ? image.replace(baseUrl, '') : image;
    const newItem: Item = {
        id: nextId++,
        name,
        description,
        category: category || undefined,
        image: cleanImage
    };
    mockData.push(newItem);
    return newItem;
};

const updateItem = (
    id: number,
    { name, description, category, image }: { name: string; description: string; category?: string; image?: string }
): Item | null => {
    const index = mockData.findIndex(i => i.id === id);
    if (index === -1) {
        return null;
    }

    const cleanImage = image && image.startsWith(baseUrl) ? image.replace(baseUrl, '') : image;
    mockData[index] = {
        id,
        name,
        description,
        category: category !== undefined ? category : mockData[index].category,
        image: cleanImage || mockData[index].image
    };
    return mockData[index];
};

const deleteItemById = (id: number): boolean => {
    const index = mockData.findIndex(i => i.id === id);
    if (index === -1) {
        return false;
    }
    mockData = mockData.filter(i => i.id !== id);
    return true;
};

export { Item, QueryParams, createItem, updateItem, deleteItemById, getItems };