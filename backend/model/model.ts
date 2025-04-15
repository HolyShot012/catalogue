//
interface QueryParams {
    offset?: number;
    limit?: number;
    sort?: {
        field: string;
        order: 'asc' | 'desc';
    };
    filter?: {
        field: string;
        value: string;
    }[];
}
//Item structure 
interface Item {
    id: number;
    name: string;
    description: string;
    image: string;
}

//Result structure for GET method
interface ItemResponse {
    result: string
    data: Item[];
    total: number;
    offset: number;
    limit: number;
}

// use mock data for testing
let mockData: Item[] = [];
for (let i = 1; i <= 100; i++) {
    mockData.push({
        id: i,
        name: `Item ${i}`,
        description: `Description for item ${i + 1}`,
        image: `http://localhost:3000/upload/temp.png`
    });
}

let nextId = mockData.length + 1; // Initialize nextId to the length of mockData + 1

//return items based on query parameters
const getItems = (params: QueryParams): ItemResponse => {
    let result = [...mockData]; // Create a shallow copy of the mock data

    if (params.filter) {
        result = result.filter(item => {
            params.filter?.some(filter => item[filter.field as keyof Item] === filter.value)
        });
    }
    if (params.sort) {
        const { field, order } = params.sort;
        result.sort((a, b) => {
            const aValue = a[field as keyof Item]
            const bValue = b[field as keyof Item]
            if (aValue < bValue) return order === 'asc' ? -1 : 1;
            if (aValue > bValue) return order === 'asc' ? 1 : -1;
            return 0;
        }
        );
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
    }
}
const createItem = (name: string, description: string, image: string): Item => {
    const newItem = {
        id: nextId++,
        name,
        description,
        image
    }
    mockData.push(newItem);
    return newItem;
}
const updateItem = (id: number, { name, description, image }: { name: string, description: string, image: string }): Item | null => {
    const index = mockData.findIndex(i => i.id === id);
    if (index === -1) {
        return null;
    }
    mockData[index] = { id, name, description, image: image || mockData[index].image };
    return mockData[index];
}
const deleteItemById = (id: number): boolean => {
    const index = mockData.findIndex(i => i.id === id);
    if (index === -1) {
        return false;
    }
    mockData = mockData.filter((i => i.id !== id));
    return true;
}
export {
    Item,
    QueryParams,
    createItem,
    updateItem,
    deleteItemById,
    getItems
}

