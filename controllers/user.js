const User = require('../models/user');

exports.signup = async (req, res) => {
    try {
        let user = new User(req.body);

        user = await user.save();
        res.json({
            user
        });
    } catch (err) {
        res.json({
            err
        });
    }
};
