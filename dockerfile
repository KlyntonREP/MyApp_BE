FROM node:18-alpine
WORKDIR /app
EXPOSE 3000
COPY . ./
RUN  npm install
CMD [ "node", "./dist/server.js" ]