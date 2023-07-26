const express = require('express');
const bodyparser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const UserRepository = require('./repository/user-repository');

const app = express();

const preparAndStartServer = () => {

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`server Started on PORT: ${PORT}`);
        const repo = new UserRepository();
        const response = await repo.getById(1);
        console.log(response);
    });
}

preparAndStartServer();