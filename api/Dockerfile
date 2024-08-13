# Dockerfile for the API


#ENTRYPOINT []

FROM node:18

WORKDIR /app

COPY package*.json ./

COPY . .

RUN rm -rf /app/node_modules 

#RUN npm cache clear --force

RUN npm install

EXPOSE 4000

CMD ["npm", "start"]