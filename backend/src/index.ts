import express from "express";
import multer from "multer";
const cors = require("cors");
import fs from "fs/promises";
import path from "path";

const app = express();
const PORT = 5000;

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "upload")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "upload/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`),
});
const upload = multer({ storage });

const metadataPath = path.join(__dirname, "upload", "metadata.json");

async function initialize() {
  try {
    await fs.mkdir("upload", { recursive: true });
    try {
      await fs.access(metadataPath);
    } catch {
      console.log("Creating metadata.json");
      await fs.writeFile(metadataPath, "{}");
    }
  } catch (err) {
    console.error("Initialization failed:", err);
  }
}
initialize();

async function readMetadata() {
  try {
    await fs.access(metadataPath);
    const data = await fs.readFile(metadataPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.warn("Metadata file missing or invalid, returning empty object:", err);
    return {};
  }
}

async function writeMetadata(metadata: Record<string, any>) {
  try {
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
  } catch (err) {
    console.error("Error writing metadata:", err);
  }
}

// Upload image with metadata
app.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const { name, description } = req.body;
  const filename = req.file.filename;
  const metadata = await readMetadata();
  metadata[filename] = {
    name: name || filename,
    description: description || "No description",
  };
  await writeMetadata(metadata);

  res.json({ message: "Image uploaded", path: `/uploads/${filename}` });
});

// List images
app.get("/images", async (req, res) => {
  try {
    const files = await fs.readdir("upload");
    const metadata = await readMetadata();
    const images = files
      .filter((file) => /\.(jpg|jpeg|png)$/i.test(file))
      .map((file) => ({
        filename: file,
        path: `/uploads/${file}`,
        name: metadata[file]?.name || file,
        description: metadata[file]?.description || "No description",
      }));
    res.json(images);
  } catch (err) {
    console.error("Error listing images:", err);
    res.status(500).json({ error: "Failed to list images" });
  }
});

// Delete image
app.delete("/images/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "upload", filename);
    const metadata = await readMetadata();
    delete metadata[filename];
    await writeMetadata(metadata);
    await fs.unlink(filePath);
    res.json({ message: "Image deleted" });
  } catch (err) {
    console.error("Error deleting image:", err);
    res.status(500).json({ error: "Failed to delete image" });
  }
});

app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);