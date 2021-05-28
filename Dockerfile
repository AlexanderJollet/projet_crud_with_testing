FROM node:12.18.1
WORKDIR /projet_crud_with_testing
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD ["npm", "start"]