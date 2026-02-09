FROM node:18-alpine

WORKDIR /app

COPY package*.json /app
RUN npm install

COPY . /app
RUN cd src 

EXPOSE 3000 

CMD ["npm", "run", "dev"]