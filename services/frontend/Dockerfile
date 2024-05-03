FROM node:18

WORKDIR /usr/src/app

EXPOSE 3000

HEALTHCHECK --start-period=1m --interval=10s \
    CMD curl -f "http://"$SERVER_NAME":3000/"" || exit 1

# CMD npm install && npm install react-bootstrap bootstrap react-router react-router-dom && npm start
CMD npm install && npm run build && node server_config.js
