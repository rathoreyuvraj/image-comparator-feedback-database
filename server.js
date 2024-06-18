const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Create or connect to a file-based SQLite database (feedback.db)
const dbPath = path.resolve(__dirname, 'feedback.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database:', dbPath);
    }
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Create feedback table if not exists
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS feedback (id INTEGER PRIMARY KEY AUTOINCREMENT, comment TEXT, rating INTEGER, image1 TEXT, image2 TEXT)");
});

// Endpoint to handle feedback submission
app.post('/submit-feedback', (req, res) => {
    const { comment, rating, image1, image2 } = req.body;
    db.run("INSERT INTO feedback (comment, rating, image1, image2) VALUES (?, ?, ?, ?)", [comment, rating, image1, image2], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Feedback submitted successfully!' });
    });
});

// Endpoint to get the next images
app.get('/get-images', (req, res) => {
    const index = parseInt(req.query.index);
    const imagesDir = path.join(__dirname, 'public', 'images');
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read images directory' });
        }
        const imageFiles = files.filter(file => file.endsWith('.jpg'));
        const image1 = imageFiles[index % imageFiles.length];
        const image2 = imageFiles[(index + 1) % imageFiles.length];
        res.json({ image1: `/images/${image1}`, image2: `/images/${image2}` });
    });
});
/*
// Endpoint to get one by one images from another folder
app.get('/get-single-image', (req, res) => {
    const index = parseInt(req.query.index);
    const singleImagesDir = path.join(__dirname, 'public', 'single-images');
    fs.readdir(singleImagesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read single images directory' });
        }
        const imageFiles = files.filter(file => file.endsWith('.jpg'));
        const singleImage = imageFiles[index % imageFiles.length];
        res.json({ image: `/single-images/${singleImage}` });
    });
});
*/

// Endpoint to get one by one images from another folder
app.get('/get-single-image', (req, res) => {
    const index = parseInt(req.query.index);
    const singleImagesDir = path.join(__dirname, 'public', 'single-images');
    fs.readdir(singleImagesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read single images directory' });
        }
        const imageFiles = files.filter(file => file.endsWith('.jpg'));
        const singleImage = imageFiles[index % imageFiles.length];
        
        // Here you should obtain the actual dimensions of the image
        // Replace the following placeholders with your actual logic to get dimensions
        const imageFilePath = path.join(singleImagesDir, singleImage);
        getImageSize(imageFilePath, (err, dimensions) => {
            if (err) {
                console.error('Error getting image dimensions:', err);
                return res.status(500).json({ error: 'Failed to get image dimensions' });
            }
            
            const { width, height } = dimensions;
            
            // Send response with image URL and dimensions
            res.json({ 
                image: `/single-images/${singleImage}`,
                width: width,
                height: height
            });
        });
    });
});

// Function to get image dimensions asynchronously
function getImageSize(imagePath, callback) {
    // Here you should implement logic to get image dimensions
    // This is a placeholder, replace it with actual code to read image dimensions
    // Example code using an image processing library like 'image-size':
    // const sizeOf = require('image-size');
    // const dimensions = sizeOf(imagePath);
    // callback(null, dimensions);
    
    // For demonstration purposes, simulating asynchronous operation
    setTimeout(() => {
        const dimensions = { width: 800, height: 600 }; // Replace with actual dimensions
        callback(null, dimensions);
    }, 100); // Simulating delay, replace with actual async logic
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
