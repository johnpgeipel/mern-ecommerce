const express = require('express');
const router = express.Router();

const { create, productById, read, deleteOne, update } = require('../controllers/product');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get(
    '/product/:productId',
    read
);
router.post(
    '/product/create/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    create
);
router.delete(
    '/product/:productId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    deleteOne
);
router.put(
    '/product/:productId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    update
);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;
