FROM node:18

WORKDIR /usr/src/app

EXPOSE 3000


HEALTHCHECK --start-period=1m --interval=10s \
    CMD curl -f http://localhost:3000/ || exit 1

CMD npm install && npm install react-bootstrap bootstrap react-router react-router-dom --save && npm update && npm start
