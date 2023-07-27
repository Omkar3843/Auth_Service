const { User } = require('../models/index');

class UserRepository {

    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("Sommething went wrong at repository level");
            throw error;
        }
    }

    async destory(userId) {
        try {
            await User.destory({
                where: {
                id: userId
            }
        });
            return true;
        } catch (error) {
            console.log("Sommething went wrong at repository level");
            throw error;
        }
    }

    // In this function we get user detail by attributes beacouse if we get user detail 
    // Directly than password also shown 
    async getById(userId){
        try {
            const user = await User.findByPk(userId, {
                attributes: ['email', 'id', ]
            });
            return user;
        } catch (error) {
            console.log("Sommething went wrong at repository level");
            throw error;
        }
    }

    async getByEmail(useremail){
        try {
            const user = await User.findOne({
                where:{
                    email: useremail
                }
            });
            return user;
        } catch (error) {
            console.log("Sommething went wrong at repository level");
            throw error;
        }
    }
}

module.exports = UserRepository;