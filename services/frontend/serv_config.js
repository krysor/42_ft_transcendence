const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');
const WebSocket = require('ws');
const fetch = require('node-fetch');  // Pour effectuer des requêtes vers le serveur Django

const app = express();
const staticDir = path.join(__dirname, 'build');

const options = {
    key: fs.readFileSync('/ssl/key.key'),
    cert: fs.readFileSync('/ssl/cert.crt')
};

const server = https.createServer(options, app);

const wss = new WebSocket.Server({ server });

// Dictionnaire pour stocker les utilisateurs connectés et leur WebSocket
const clients = new Map();

// Fonction pour envoyer des pings et gérer les pongs
const pingInterval = 10000;  // Intervalle de ping en millisecondes
setInterval(() => {
    clients.forEach((client, userId) => {
        if (client.isAlive === false) {
            clients.delete(userId);
            updateOnlineStatus(userId, false);
            return client.ws.terminate();
        }

        client.isAlive = false;
        client.ws.send(JSON.stringify({ type: 'ping' }));
    });
}, pingInterval);

// Met à jour le statut en ligne de l'utilisateur dans le serveur Django
const updateOnlineStatus = async (userId, isOnline) => {
    try {
        await fetch(`https://loclahost:8000/user/update_online_status/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, isOnline })
        });
    } catch (error) {
        console.error('Error updating online status:', error);
    }
};

wss.on('connection', function connection(ws, req) {
    const token = new URLSearchParams(req.url.split('?')[1]).get('token');

    // Fetch user ID from Django using the token
    fetch(`https://loclahost:8000/user/get_user_detail/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
    })
    .then(response => response.json())
    .then(data => {
        const userId = data.user.id;
        if (userId) {
            clients.set(userId, { ws, isAlive: true });
            updateOnlineStatus(userId, true);

            ws.on('pong', () => {
                clients.get(userId).isAlive = true;
            });

            ws.on('message', function incoming(message) {
                console.log('received: %s', message);
                // Handle incoming messages from the client
            });

            ws.on('close', () => {
                clients.delete(userId);
                updateOnlineStatus(userId, false);
            });
        } else {
            ws.terminate();
        }
    })
    .catch(error => {
        console.error('Error fetching user ID:', error);
        ws.terminate();
    });

    ws.send(JSON.stringify({ type: 'connected' }));
});

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
