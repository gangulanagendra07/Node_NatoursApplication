const User = require('../models/userModel');
const ApiFeatures = require('../utilities/apiFeatures');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
}

exports.getAllUsers = factory.getAll(User);
exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
}
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

exports.getUser = factory.getOne(User);
exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);