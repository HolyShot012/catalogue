import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';

const app = express();
const PORT = 5000;

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`),
});
const upload = multer({ storage });

const metadataPath = path.join(__dirname, '../uploads', 'metadata.json');

async function initialize() {
  if (!fs.existsSync('uploads')) await fs.mkdir('uploads');
  if (!fs.existsSync(metadataPath)) await fs.writeFile(metadataPath, '{}');
}
initialize();

async function readMetadata() {
  const data = await fs.readFile(metadataPath, 'utf8');
  return JSON.parse(data);
}

async function writeMetadata(metadata: Record<string, any>) {
  await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
}

// Upload image with metadata
app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const { name, description } = req.body;
  const filename = req.file.filename;
  const metadata = await readMetadata();
  metadata[filename] = { name: name || filename, description: description || 'No description' };
  await writeMetadata(metadata);

  res.json({ message: 'Image uploaded', path: `/uploads/${filename}` });
});

// List images
app.get('/images', async (req, res) => {
  const files = await fs.readdir('uploads');
  const metadata = await readMetadata();
  const images = files
    .filter((file) => /\.(jpg|jpeg|png)$/i.test(file))
    .map((file) => ({
      filename: file,
      path: `/uploads/${file}`,
      name: metadata[file]?.name || file,
      description: metadata[file]?.description || 'No description',
    }));
  res.json(images);
});

// Delete image
app.delete('/images/:filename', async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', filename);
  const metadata = await readMetadata();
  delete metadata[filename];
  await writeMetadata(metadata);
  await fs.unlink(filePath);
  res.json({ message: 'Image deleted' });
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));