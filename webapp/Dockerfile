# Dockerfile for the webapp


#ENTRYPOINT []

FROM node:18

WORKDIR /app

COPY package*.json ./

COPY . .

RUN rm -rf /app/node_modules 

#RUN npm cache clear --force

RUN npm install

RUN chmod a+x /app/node_modules/.bin/react-scripts

EXPOSE 3000

CMD ["npm", "start"]