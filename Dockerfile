FROM node:18.19.0

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3101

ENV PORT=3101 SALT_OUR_ROUNDS=10 JWT_SECRET=superSecret@JWT!

CMD ["npm", "run", "start"]