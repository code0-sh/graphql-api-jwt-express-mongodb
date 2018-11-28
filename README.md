GraphQL APIs with JSON Web Tokens
====

# Overview
GraphQL APIs using JWT with Express and MongoDB.

- Framework for Node.js - using [Express](http://expressjs.com/) v4.16.4
- Authentication via [JWT](https://jwt.io/)
- Authentication middleware - using [Passport](http://www.passportjs.org/)
- Database - using [MongoDB](https://www.mongodb.com/) v3.6.2
- MongoDB object modeling tool -  using [Mongoose](http://mongoosejs.com/) v5.3.14
- Object schema validation - using [Joi](https://github.com/hapijs/joi)
- Test - using [Jest](https://facebook.github.io/jest/)

# Environment
OS: macOS High Sierra v10.13.6

MongoDB: v3.6.2

Text Editor: Visual Studio Code v1.29.1

Visual Studio Code Plugins
- [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Flow Language Support](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode)
- [JavaScript Standard Style](https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs)

# Install

If you install MongoDB, Yarn using Homebrew

```sh
$ brew install mongodb
$ brew install yarn
```

Login to create DB 
```sh
## start only once
$ mongod --config /usr/local/etc/mongod.conf
# login
$ mongo
# create DB
# Please also set your DB name in config.js
$ use databaseName
```

Start by cloning this repository

```sh
# HTTPS
$ git clone https://github.com/code0-sh/graphql-api-jwt-express-mongodb.git
```

then

Defining environment variables
```sh
# create an .env file right under the project
# and describe with reference to .env.sample
NODE_SECRET = "neWKqPh9gkWR"
```

```sh
# required to use Flow
$ yarn global add flow-typed
# required for bcrypt
$ yarn global add node-gyp 
# cd into project root
$ yarn install
# start the api
$ yarn start

# test the api
$ yarn test

# build the api
$ yarn build
# Set NODE_ENV of .env to production
$ node dist/index.js
```

# Usage

The expiration date of the access token is set to 300 seconds, and the refresh token is set to 14 days.
Automatically delete refresh tokens with TTL Indexes.

# License
[MIT](./LICENSE)
