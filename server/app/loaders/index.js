const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');
const Relationship = require('../models/relationship');
const User = require('../models/user');


const loader = async () => {
    try {
        const server = await expressLoader();
        const mongooseConnection = await mongooseLoader.connect();

        
        await Relationship.deleteMany({}).exec();
        await User.updateMany({}, {initialized: false});

        console.info(`MongoDB connected: ${mongooseConnection.name}`);
        console.info('Server Initialized');

        return server;
    } catch (err) {
        console.error(err);
    }
};

module.exports = loader;
