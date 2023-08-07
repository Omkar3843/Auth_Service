const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

    async signIn(email, plainpassword) {
        try {
            // step 1-> fetch the user form email
            const user = await this.userRepository.getByEmail(email);

            // step 2-> compare incoming plain password with stores encrypted password
            const passwordsmatch = this.checkPassword(plainpassword, user.password);

            if(!passwordsmatch){
              console.log("Password doesn't match");
              throw {error: 'Incorrect password'};
            }

            // step 3-> if passwords match then create a token and send it to the user
            const newJWT = this.cretaeToken({email: user.email, id: user.id});
             return newJWT;
         }  catch (error) {
                console.log("Something went wrong in the sign in process");
                throw error;

            }

    }

    async isAutheenticated(token) {
        try {
            const response = await this.verifyToken(token);
            if(!response){
                throw {error: 'Invalis Token'}
            }
            const user = await this.userRepository.getById(response.id);
            if(!user){
                throw {error: 'NO user with corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("something went wrong in auth process");
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

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Sommething went wrong at password comparision");
            throw error;
        }
    }
}

module.exports = UserService;