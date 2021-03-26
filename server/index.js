require('dotenv').config();
process.env.RELATIONSHIP_IDENTITY_HASH_SECRET = require('crypto').randomBytes(128).toString('hex');

const Server = require('./server');

const server = new Server();

server.start();
