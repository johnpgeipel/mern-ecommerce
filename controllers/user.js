const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup = async (req, res) => {
    // console.log("req.body", req.body);
    try {
        let user = new User(req.body);

        user = await user.save();
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    } catch (err) {
        res.json({
            err: errorHandler(err)
        });
    }
};
