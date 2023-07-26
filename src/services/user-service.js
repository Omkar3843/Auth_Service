const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/user-repository');

const { JWT_KEY} = require('../config/serverConfig');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
           const user = await this.userRepository.create(data);
           return user; 
        } catch (error) {
            console.log("Sommething went wrong at Service layer");
            throw error;
        }
    }

    cretaeToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: 30});
            return result;
        } catch (error) {
            console.log("Sommething went wrong at Token Creation");
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Sommething went wrong at Token Verifycation", error);
            throw error;
        }
    }
}

module.exports = UserService;