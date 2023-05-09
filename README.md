# Crud-Api-with-Load-Balancing
An Api with simple crud Application with the implementation of node clustering and load balancing done with Redis for caching and mongodb as database.The development and production builds are bundled with webpack

## Installation

1. Clone the repository: `git clone https://github.com/[user]/[repo].git`
2. Install dependencies: `npm install`

## Configuration

Create a `.env` file in the root directory of the project with the following variables:

- `PORT`: the port on which the server will run
- `MONGODB_URI`: the URI for the MongoDB database
- `REDIS_HOST`: the Redis host
- `REDIS_PORT`: the Redis port
- `REDIS_PASSWORD`: the Redis password (if applicable)

## Database Setup

### MongoDB

1. Install MongoDB: https://docs.mongodb.com/manual/installation/
2. Start the MongoDB service: https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/
3. Create a database for the project and a user with read and write access to that database: https://docs.mongodb.com/manual/reference/method/db.createUser/
4. Add the MongoDB URI for the project to the `.env` file

### Redis

1. Install Redis: https://redis.io/topics/quickstart
2. Start the Redis service: https://redis.io/topics/quickstart#starting-redis
3. Add the Redis URI to the `.env` file

## Scripts

After completing the setup to run or build the app use any othe following commands
- `npm start`: starts the server with nodemon
- `npm run build:dev`: builds the development version of the app using webpack and starts it
- `npm run build:prod`: builds the production version of the app using webpack and starts it
- `npm run start:prod`: starts the production version of the app
- `npm run start:dev`: starts the development version of the app
- `npm run start:multi`: starts the development version of the app in cluster mode

## Documentation

For more information on how to use the project, see the [documentation](https://example.com/documentation).
