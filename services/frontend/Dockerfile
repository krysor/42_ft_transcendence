FROM node:18

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

HEALTHCHECK --start-period=1m --interval=10s \
    CMD curl -f http://localhost:3000/ || exit 1

CMD ["npm", "start"]
