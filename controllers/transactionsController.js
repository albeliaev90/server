
const Transaction = require('../models/Transaction');
const User = require('../models/User');

class usersController {
    // POST /users
    async createTransaction(req, res) {
        const {ownerId}=req.params
        try {
            const transaction = await Transaction.create(req.body);
            res.status(201).json(transaction);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create user' });
        }
    }

    // GET /users
    async getTransactions(req, res) {
        
        const { page = 1, limit = 9,  } = req.query;

        const perPage =limit * page;
      
        let sortOrder = { createdAt: -1 };

        try {
            const usersListLength = (await Transaction.find().sort(sortOrder)).length
            const usersList = await Transaction.find().sort(sortOrder).limit(perPage)
            return res.status(200).json({ usersList, usersListLength });

        } catch (error) {
            console.log(error);
            return res.status(500).send(` Server Error: ${error}`);
        }
    }
    async getTransactionsByUserId(req, res) {
        
        const { id } = req.params;

        console.log("userId", id);

        try {
            const transactions = await Transaction.find({ownerId:id})
           
            return res.status(200).json(transactions);

        } catch (error) {
            console.log(error);
            return res.status(500).send(` Server Error: ${error}`);
        }
    }

    // GET /users/:id
    async getTransactionById(req, res) {
        const { id } = req.params;

        try {
            const transaction = await Transaction.findById(id);
            if (!user) {
                return res.status(404).json({ error: 'Transaction not found' });
            }
            res.status(200).json(transaction);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get user' });
        }
    }

    // PUT /users/:id
    async updateTransaction(req, res) {
        const { id } = req.params;
        

        try {
            const updatedUser = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update user' });
        }
    }
    async updateTransactionByUser(req, res) {
        console.log('HERE');
        const { id,userId, accountNumber } = req.body;
        try {
            const updated= await Transaction.findByIdAndUpdate(id, {accountNumber, status:'pending', }, { new: true });
            if (!updated) {
                return res.status(404).json({ error: 'User not found' });
            }
          const up=  await User.findOneAndUpdate({_id:userId},{clientUpdateDate:new Date()},{ new: true })
          console.log('up',up);
            res.status(200).json(updated);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to update user' });
        }
    }

    // DELETE /users/:id
    async deleteTransaction(req, res) {
        const { id } = req.params
            ;


        try {
            const deletedUser = await Transaction.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json({ message: 'Transaction deleted successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to delete user' });
        }
    }

   

}


module.exports = new usersController()