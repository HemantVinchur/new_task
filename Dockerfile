FROM node:18.12.1-alpine

# create a non-root user
RUN adduser -D chromiumuser

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

#RUN npm install -g forever
ARG PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=$PUPPETEER_SKIP_CHROMIUM_DOWNLOAD
ENV PUPPETEER_DOWNLOAD_CACHE=/tmp/puppeteer-cache
RUN npm install
RUN apk add chromium
RUN chown -R chromiumuser /usr/bin/chromium-browser

COPY . .

RUN chown -R chromiumuser:chromiumuser /usr/src/app

USER chromiumuser

CMD ["/bin/sh", "-c", "npm run migration:run-prod && npm run dev"]

