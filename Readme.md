How to run:

- Install and run docker locally (see: https://docs.docker.com/desktop/install/windows-install/)
- Run MongoDB on docker (see: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-community-with-docker/)
- Run command 'npm install' on project folder to install dependencies
- Create .env file on project folder
- Fill .env file with following variables:
  - PORT=3101
    SALT_OUR_ROUNDS=10
    JWT_SECRET=superSecret@JWT!
- Run command 'npm run start' on project folder
- See endpoints on Postman collection file on project folder
- Enjoy
