import express, { Express, Request, Response } from 'express';
import path from 'path';
const cors = require('cors');
import itemsRouter from './routers/items';
import upload from './upload'; // Import the typed upload module

const port = 3000;

const app: Express = express();
app.use(express.json());
app.use(cors());

// Serve the admin dashboard
app.get('/', (req: Request, res: Response) => {
    const filePath = path.join(__dirname, 'index.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(`Error serving index.html: ${err.message}`);
            res.status(500).json({
                result: 'error',
                errors: [{ status: 500, title: 'Server Error', details: 'Failed to load admin dashboard' }]
            });
        }
    });
});

// Serve uploaded images
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// Use items router with the imported upload middleware
app.use('/api/items', upload.single('imageFile'), itemsRouter);

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});