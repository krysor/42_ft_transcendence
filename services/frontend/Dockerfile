FROM node:18

WORKDIR /usr/src/app

EXPOSE 3000

RUN npm install --no-cache \
    && npm install react-bootstrap bootstrap react-router react-router-dom \
    && npm cache clean --force

CMD ["npm", "start"]