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
}

module.exports = UserRepository;