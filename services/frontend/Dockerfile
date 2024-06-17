FROM node:latest

WORKDIR /usr/src/app

EXPOSE 3000

# HEALTHCHECK --start-period=1m --interval=10s \
#     CMD curl -f "http://"$SERVER_NAME":3000/"" || exit 1

# http
CMD npm install && npm install react-bootstrap bootstrap \
	react-router react-router-dom \
	i18next react-i18next i18next-browser-languagedetector && npm start
# https
# CMD npm install && npm run build && node serv_config.js
