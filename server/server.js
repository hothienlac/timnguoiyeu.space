const loaders = require("./app/loaders");

function listen(err) {
    if (err) {
        console.error(err);
        return;
    }
    console.info(`Your server is ready!`);
}

class Server {
    constructor() {
    }

    async start() {
        this.server = await loaders();
        this.server.listen(process.env.PORT || 3000, listen());
    }
}

module.exports = Server;
