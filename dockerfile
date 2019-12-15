FROM node:12
ARG ENV
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install pm2 -g
RUN apt-get update
RUN apt-get -y install cron
RUN touch /etc/cron.d/crons
RUN touch /var/log/cron.log
RUN chmod 0644 /etc/cron.d/crons
COPY . .
RUN if [ "$ENV" = "prod" ]; \
    then  cp .env-prod .env; \
	else  cp .env-dev .env;  \
	fi
EXPOSE 3000
CMD cron  && npm run deploy