FROM node:18-alpine
WORKDIR /app
VOLUME  /etc/letsencrypt/live/api.gettrill.com/privkey.pem:/etc/letsencrypt/live/api.gettrill.com/privkey.pem
VOLUME  /etc/letsencrypt/live/api.gettrill.com/fullchain.pem:/etc/letsencrypt/live/api.gettrill.com/fullchain.pem
EXPOSE 3030
COPY . ./
RUN npm ci --include=prod
# RUN ls -a
RUN npm run build
CMD [ "npm", "run", "start:prod" ]

