const express = require('express');

const { PORT } = require('./config/serverConfig');
const app = express();

const preparAndStartServer = () => {

    app.listen(PORT, () => {
        console.log(`server Started on PORT: ${PORT}`);
    });
}

preparAndStartServer();