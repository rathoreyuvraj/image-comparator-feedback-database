const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Path to the SQLite database file
const dbPath = path.join(__dirname, 'feedback.db');

// Create a new database (if it doesn't exist)
const db = new sqlite3.Database(dbPath);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Create feedback table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS feedback (
            image1 TEXT,
            comment TEXT,
            better_image TEXT,
            PRIMARY KEY (image1)
        )
    `);
});

// Endpoint to handle feedback submission
app.post('/submit-feedback', (req, res) => {
    const {image1, feedback, better_value} = req.body;
    console.log(image1,feedback,better_value)
    db.run("INSERT INTO feedback (image1, comment, better_image) VALUES ( ?, ?, ?) ON CONFLICT (image1) DO UPDATE SET ( comment,better_image) = (excluded.comment, excluded.better_image);", [image1, feedback,better_value], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Feedback submitted successfully!' });
    });
});

// Endpoint to get the next images
app.get('/get-images-and-side-image', (req, res) => {
    const index = parseInt(req.query.index);
    const imagesDir = path.join(__dirname, 'public', 'images');
    const sideImagesDir = path.join(__dirname, 'public', 'side-images');

    fs.readdir(imagesDir, (err, imageFiles) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read images directory' });
        }
        imageFiles = imageFiles.filter(file => file.endsWith('.jpg'));
        const image1 = imageFiles[index % imageFiles.length];
        const image2 = imageFiles[(index + 1) % imageFiles.length];

        fs.readdir(sideImagesDir, (err, sideImageFiles) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read side images directory' });
            }
            sideImageFiles = sideImageFiles.filter(file => file.endsWith('.jpg'));
            const sideImage = sideImageFiles[index % sideImageFiles.length];

            res.json({
                image1: `/images/${image1}`,
                image2: `/images/${image2}`,
                sideImage: `/side-images/${sideImage}`
            });
        });
    });
});

app.get('/get-previous-images', (req, res) => {
    const index = parseInt(req.query.index);
    const imagesDir = path.join(__dirname, 'public', 'images');
    const sideImagesDir = path.join(__dirname, 'public', 'side-images');

    fs.readdir(imagesDir, (err, imageFiles) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read images directory' });
        }
        imageFiles = imageFiles.filter(file => file.endsWith('.jpg'));
        const image1 = imageFiles[(index) % imageFiles.length];
        
        const image2 = imageFiles[(index+1) % imageFiles.length];
        

        fs.readdir(sideImagesDir, (err, sideImageFiles) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to read side images directory' });
            }
            sideImageFiles = sideImageFiles.filter(file => file.endsWith('.jpg'));
            const sideImage = sideImageFiles[(index)% sideImageFiles.length];
            

            res.json({
                image1: `/images/${image1}`,
                image2: `/images/${image2}`,
                sideImage: `/side-images/${sideImage}`
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
