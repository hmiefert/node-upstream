const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

app.post('/upload', (req, res) => {
    const targetFilePath = path.join(__dirname, 'uploads', 'upload.mp4')
    const targetFileStream = fs.createWriteStream(targetFilePath);
    
    req.on('data', (chunk) => {
        targetFileStream.write(chunk);    
    });

    req.on('end', () => {
        console.log('Upload finished')
        targetFileStream.close()
        res.json({message: 'Upload successful..'});
    });
})

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
})