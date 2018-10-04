const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || 'localhost');

app.post('/upload', (req, res) => {

    const headersJson = JSON.stringify(req.headers, null, 2)
    console.log(`Receiving upload request with headers:\n${headersJson}\n`);

    const targetFilePath = path.join(__dirname, 'uploads', 'upload.mp4');
    const targetFileStream = fs.createWriteStream(targetFilePath);
    let chunkCounter = 0;
    let uploadSize = 0;

    req.on('data', (chunk) => {
        console.log(`Received chunk #${chunkCounter++} with ${chunk.length.toString()} bytes.`);
        targetFileStream.write(chunk);
        uploadSize += chunk.length;
    });

    req.on('end', () => {
        console.log(`\nUpload finished. Received a total of ${uploadSize} bytes.\nFile saved at: ${targetFilePath}.`);
        targetFileStream.close();
        res.json({message: 'Upload finished'});
    });
});

app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server running at http://${app.get('host')}:${app.get('port')}`);
});