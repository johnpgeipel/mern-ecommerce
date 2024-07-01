const User = require('../models/user');

exports.signup = async (req, res) => {
    try {
        let user = new User(req.body);
        
        user = await user.save();
        res.status(200).json({
            user
        });
    } catch (err) {
        res.status(500).json({
            err
        });
    }
};
