import express, { Express } from 'express';
import { Request, Response } from 'express';
import path from 'path';
const cors = require('cors');
import itemsRouter from './routers/items';


const port = 3000

const app: Express = express();
app.use(express.json());
app.use(cors());

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


app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.use('/api/items', itemsRouter)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}
);