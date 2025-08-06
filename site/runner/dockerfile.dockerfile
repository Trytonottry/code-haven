FROM node:20-alpine
RUN apk add --no-cache git docker-cli
WORKDIR /runner
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["node", "worker.js"]