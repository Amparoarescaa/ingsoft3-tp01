FROM node:22-alpine AS dependencies

WORKDIR /app

COPY package*.json ./
COPY archivo-que-no-existe.txt ./

RUN npm ci --omit=dev


FROM node:22-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production

COPY --from=dependencies /app/node_modules ./node_modules

COPY package*.json ./
COPY db.js ./
COPY server.js ./

EXPOSE 3000

CMD ["node", "server.js"]