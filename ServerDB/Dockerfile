FROM node:18

COPY . /usr/local/Server

WORKDIR /usr/local/Server

RUN npm install

EXPOSE 8000

CMD ["node", "serverDB.js"]