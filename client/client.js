const fs = require('fs');
const request = require('request');

const requestOptions = {
    url: 'http://localhost:3000/upload',
    headers: {
        'Content-Type':'application/octet-stream',
        'User-Agent': 'request'
    }
}


fs.createReadStream('sample.mp4')
    .pipe(request.post(requestOptions))