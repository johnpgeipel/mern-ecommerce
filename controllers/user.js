const User = require('../models/user');

exports.signup = async (req, res) => {
    try {
        const user = new User(req.body);
        
        // Await the Promise returned by .save()
        const savedUser = await user.save();

        res.status(200).json({
            message: "Created",
            user: savedUser,
        });
    } catch (err) {
        res.status(500).json({
            message: "Error creating user",
        });
    }
};