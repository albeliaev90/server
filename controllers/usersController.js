const User = require('../models/User')

class usersController {
    // POST /users
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create user' });
        }
    }

    // GET /users
    async getUsers(req, res) {
        
        const { page = 1, limit = 9,  } = req.query;

        const perPage =limit * page;
      
        let sortOrder = { clientUpdateDate: -1 };

        try {
            const usersListLength = (await User.find().sort(sortOrder)).length
            const usersList = await User.find().sort(sortOrder).limit(perPage)
            return res.status(200).json({ usersList, usersListLength });

        } catch (error) {
            console.log(error);
            return res.status(500).send(` Server Error: ${error}`);
        }
    }

    // GET /users/:id
    async getUserById(req, res) {
        const { id } = req.params;

        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get user' });
        }
    }

    // PUT /users/:id
    async updateUser(req, res) {
        const { id } = req.params;

        try {
            const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update user' });
        }
    }


    // DELETE /users/:id
    async deleteUser(req, res) {
        const { id } = req.params
            ;


        try {
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to delete user' });
        }
    }

    // GET /users/search/:query
    async searchUser(req, res) {
        const { query } = req.params
         
        

        try {
            if (query === '') {
                return res.status(200).json([])
            }
            const regExp = new RegExp(query, "i")//создаем регуляроне выражение где ищем query, i - значит что инорирует регистр
            const searchResult = await User.find({ email: { $regex: regExp } })
            return res.status(200).json(searchResult)
        } catch (error) {
            console.log(error);
            console.log(error);
            res.status(500).json({ error: 'Failed to search user' });
        }
    }

}


module.exports = new usersController()