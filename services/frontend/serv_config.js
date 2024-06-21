const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
const staticDir = path.join(__dirname, 'build');

const options = {
    key: fs.readFileSync('/ssl/key.key'),
    cert: fs.readFileSync('/ssl/cert.crt')
};

const server = https.createServer(options, app);

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

app.get('*', (req, res) => {
    res.sendFile(path.join(staticDir, 'index.html'));
});

server.listen(3000, () => {
    console.log('Server running on https://localhost:3000');
});
