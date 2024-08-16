const Category = require('../models/category');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = async (req, res) => {
    try {
        const category = new Category(req.body);
        const data = await category.save();
        res.json({
            data
        });

    } catch (err) {
        return res.status(400).json({
            error: errorHandler(err)
        });
    };
}
