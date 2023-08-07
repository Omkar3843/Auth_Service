const express = require('express');
const bodyparser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

// const UserRepository = require('./repository/user-repository');
// const UserService = require('./services/user-service');

const db = require('./models/index');
// const {User, Role} = require('./models/index');

const app = express();

const preparAndStartServer = () => {

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`server Started on PORT: ${PORT}`);
        // const repo = new UserRepository();
        // const response = await repo.getById(1);
        // console.log(response);

        // const service = new UserService();
        // const nweToken = service.cretaeToken({email: 'omkar@123gmail.com', id: 1});
        // console.log("new token is", nweToken);
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9ta2FyQDEyM2dtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2OTAzNTIzNDUsImV4cCI6MTY5MDM1MjM3NX0.ph8pDhOdATlm9FpY76rIL9E_acYL_Svp_U3C5jJf-C8';
        // const response = service.verifyToken(token);
        // console.log(response);

        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true});
        }

        // const u1 = await User.findByPk(4);
        // const r1 = await Role.findByPk(1);
        // // u1.addRole(r1);
        // const response = await u1.getRoles();
        // console.log(response);
    });
}

preparAndStartServer();