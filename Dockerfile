FROM node:18-alpine
WORKDIR /
VOLUME  /etc/letsencrypt/:/etc/letsencrypt/
VOLUME  /etc/ssl:/etc/ssl
EXPOSE 3030:3030
EXPOSE 80:80
EXPOSE 443:443
COPY . ./
RUN npm ci --include=prod
# RUN ls -a
RUN npm run build
CMD [ "npm", "run", "start:prod" ]

