FROM node:8
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install pm2 -g
COPY . .
RUN cp .env-dev .env
EXPOSE 3000
CMD ["npm", "run","deploy"]