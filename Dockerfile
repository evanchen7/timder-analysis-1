FROM node:latest

WORKDIR /Users/evanchen/Documents/GitHub/timder-analysis-1

COPY package.json package-lock.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080 5432

CMD [ "npm", "start" ]
