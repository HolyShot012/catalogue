import express, { Express } from 'express';
import path from 'path';
const cors = require('cors');
import itemsRouter from './routers/items';

const port = 3000

const app: Express = express();
app.use(express.json());
app.use(cors());

app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.use('/api/items', itemsRouter)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}
);