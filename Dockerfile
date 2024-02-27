FROM node:18-alpine
WORKDIR /app
EXPOSE 3030
COPY . ./
RUN npm ci --include=prod
# RUN ls -a
RUN npm run build
CMD [ "npm", "run", "start:prod" ]
