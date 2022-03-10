const User = require('../models/userModel');
const ApiFeatures = require('../utilities/apiFeatures');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
}

exports.getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find();

    //Send Response
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            user: users
        }
    })
});
exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) Create an error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This route not for password update. Please use /updateMyPasswor', 400));
    }
    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');
    // 3) upadte user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, { new: true, runValidators: true });

    res.status(200).json({
        status: 'Success',
        data: {
            user: updatedUser
        }
    })
});
exports.deleteMe = catchAsync(async (req, res, next) => {

    await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({
        status: 'Success',
        data: null
    })

});

exports.getUser = ((req, res) => {
    res.status(500).json({
        status: 'error',
        message: ' This route is not defined yet'
    })
});
exports.createUser = ((req, res) => {
    res.status(500).json({
        status: 'error',
        message: ' This route is not defined yet'
    })
});
exports.updateUser = ((req, res) => {
    res.status(500).json({
        status: 'error',
        message: ' This route is not defined yet'
    })
});
exports.deleteUser = ((req, res) => {
    res.status(500).json({
        status: 'error',
        message: ' This route is not defined yet'
    })
});