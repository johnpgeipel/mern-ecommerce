const express = require('express');
const router = express.Router();
const { userById } = require('../controllers/user');

const {
    create,
    categoryById,
    read,
    update,
    deleteOne,
    list
} = require('../controllers/category');

const {
    requireSignin,
    isAuth,
    isAdmin
} = require('../controllers/auth');

router.get('/category/:categoryId', read);

router.post(
    '/category/create/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    create
);

router.put(
    '/category/:categoryId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    update
);

router.delete(
    '/category/:categoryId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    deleteOne
);

router.get('/categories', list);

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;
