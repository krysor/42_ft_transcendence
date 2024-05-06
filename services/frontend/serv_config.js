const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');
const WebSocket = require('ws'); // Importez le module WebSocket

const app = express();
const staticDir = path.join(__dirname, 'build');

const options = {
    key: fs.readFileSync('/ssl/key.key'),
    cert: fs.readFileSync('/ssl/cert.crt')
};

// Créez le serveur HTTPS avec les options SSL/TLS
const server = https.createServer(options, app);

// Initialisez le serveur WebSocket
const wss = new WebSocket.Server({ server });

// Gérez les connexions WebSocket
wss.on('connection', function connection(ws) {
    // Gérez les messages, les erreurs, etc.
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('connected');
});

// Servez les fichiers statiques
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
// Écoutez les connexions sur le port 443 avec HTTPS
server.listen(3000, () => {
    console.log('Server running on https://localhost:3000');
});
