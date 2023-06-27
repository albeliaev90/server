const Admin = require('../models/Admin');

const User = require('../models/User')

class authController {
    // POST /users
    async login(req, res) {
        const { email, password } = req.body
        try {
            
            const admin = await Admin.findOne({ email, password})
            if (admin) {
                return res.status(200).json({ user: admin, isAdmin: true });
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json('Incorrect email');
            }
            if (user.password !== password) {
                return res.status(400).json('Incorrect password');
            }
            res.status(200).json({ user, isAdmin: false });
        } catch (error) {
            res.status(500).json({ error: 'Oops! error.' });
        }
    }
}
module.exports = new authController()