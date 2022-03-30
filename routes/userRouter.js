const fs = require('fs');
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


router.post(`/signup`, authController.signUp);
router.post(`/login`, authController.login);
router
    .post(`/forgotPassword`, authController.forgotPassword);
router
    .patch(`/resetPassword/:token`, authController.resetPassword);

// Midleware to protect all below routes
// router.use(authController.protect);
router
    .patch(`/upadteMyPassword`, authController.protect, authController.updatePassword);
router
    .patch(`/updateMe`, authController.protect, userController.updateMe);
router
    .delete(`/deleteMe`, authController.protect, userController.deleteMe);
router.route(`/me`, authController.protect, userController.getMe, userController.getUser);

// below middleware using to protect only for Admin
// router.use(authController.restrictTo('admin'));

router
    .route(`/`)
    .get(authController.protect, authController.restrictTo('admin'), userController.getAllUsers)
    .post(authController.protect, authController.restrictTo('admin'), userController.createUser);
router
    .route(`/:id`)
    .get(authController.protect, authController.restrictTo('admin'), userController.getUser)
    .patch(authController.protect, authController.restrictTo('admin'), userController.updateUser)
    .delete(authController.protect, authController.restrictTo('admin'), userController.deleteUser);



module.exports = router;