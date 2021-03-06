const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');
const APIFeatures = require('../utilities/apiFeatures');

exports.getAll = Model => catchAsync(async (req, res, next) => {

    // To allow for nested GET reviews on tour
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId }

    const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination();

    const docs = await features.query;
    res.status(201).json({
        status: 'success',
        message: 'Successfully fetched tours data',
        length: docs.length,
        data: {
            data: docs
        }
    })
});

exports.updateOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!doc) {
        return next(new AppError('No document found with that Id', 404));
    }
    res.status(201).json({
        status: 'success',
        message: 'document data updated successfully',
        data: {
            data: doc
        }
    })
});

exports.deleteOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
        return next(new AppError('No document found with that Id', 404));
    }
    res.status(200).json({
        status: 'success',
        message: `document has deleted successfully`
    })
});

exports.createOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    })
});

exports.getOne = (Model, popOptions) => catchAsync(async (req, res, next) => {

    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) {
        return next(new AppError('No document found with that Id', 404));
    }
    res.status(200).json({
        status: ' success',
        message: 'Document Data fetched succesfully',
        data: {
            data: doc
        }
    })
});