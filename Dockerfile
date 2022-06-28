FROM node:14-alpine
WORKDIR /usr/src/app
COPY src .
RUN npm i
EXPOSE 3000
CMD [ "npm", "start" ]
