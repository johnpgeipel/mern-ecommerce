const Category = require('../models/category');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.categoryById = async (req, res, next, id) => {
    try {
        const category = await Category.findById(id);
        req.category = category;
        next();
    } catch (err) {
        return res.status(400).json({
            error: errorHandler(err) || 'Catergory does not exist'
        });
    }
};

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
exports.read = (req, res) => {
    return res.json(req.category);
}
