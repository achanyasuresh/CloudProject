FROM node:alpine3.19
WORKDIR /frontend
COPY . .
RUN npm install
EXPOSE 3000
RUN ls
CMD [ "npm", "start"]