const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

const options = {
    key: fs.readFileSync('./ssl/private/nginx.key'),
    cert: fs.readFileSync('./ssl/certs/nginx.crt')
};

const staticDir = path.join(__dirname, 'build');

app.get('/', (req, res) => {
    res.sendFile(path.join(staticDir, 'index.html'));
});

app.use(express.static('./build', {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript');
        }
    }
}));

https.createServer(options, app).listen(443);