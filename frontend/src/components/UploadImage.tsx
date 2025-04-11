import React, { useState, useEffect } from "react";
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
const UploadComponent: React.FC = () => {


    const [images, setImages] = useState<any[]>([]);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        const res = await axios.get('/api/images');
        setImages(res.data);
    };

    const handleUpload = async (acceptedFiles: File[]) => {
        const formData = new FormData();
        formData.append('image', acceptedFiles[0]);
        formData.append('name', name || acceptedFiles[0].name);
        formData.append('description', description || 'No description');

        try {
            const res = await axios.post('/api/upload', formData);
            setMessage(res.data.message);
            setName('');
            setDescription('');
            fetchImages();
        } catch (error) {
            setMessage('Upload failed');
        }
    };

    const handleRemove = async (filename: string) => {
        await axios.delete(`/api/images/${filename}`);
        fetchImages();
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': ['.jpg', '.jpeg', '.png'] },
        onDrop: handleUpload,
    });

    return (
        <div style={{ padding: '20px' }}>
            <h2>Image Catalogue (Vite Frontend)</h2>
            <div
                {...getRootProps()}
                style={{ border: '2px dashed #666', padding: '20px', marginBottom: '20px' }}
            >
                <input {...getInputProps()} />
                <p>Drag 'n' drop or click to upload</p>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Image Name"
                    onClick={(e) => e.stopPropagation()}
                    style={{ margin: '5px' }}
                />
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    onClick={(e) => e.stopPropagation()}
                    style={{ margin: '5px' }}
                />
            </div>
            {message && <p>{message}</p>}
            <h3>Images ({images.length})</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
                {images.map((image) => (
                    <div key={image.filename}>
                        <img
                            src={`http://localhost:5000${image.path}`}
                            alt={image.name}
                            style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                        />
                        <p><strong>Name:</strong> {image.name}</p>
                        <p><strong>Description:</strong> {image.description}</p>
                        <button onClick={() => handleRemove(image.filename)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );


}

export default UploadComponent;