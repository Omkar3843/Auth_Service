const express = require('express');
const bodyparser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const app = express();

const preparAndStartServer = () => {

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        console.log(`server Started on PORT: ${PORT}`);
    });
}

preparAndStartServer();