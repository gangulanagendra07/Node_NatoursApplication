const fs = require('fs');
const Tour = require('../models/TourModel');
// const APIFeatures = require('../utilities/apiFeatures');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');
const factory = require('./handlerFactory');

exports.aliasTopTours = async (req, res, next) => {
    req.query.limit = 5;
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingAverage,summary,difficulty';
    next();
}

exports.getAllTours = factory.getAll(Tour);

// exports.getAllTours = catchAsync(async (req, res, next) => {

//     const features = new APIFeatures(Tour.find(), req.query)
//         .filter()
//         .sort()
//         .limitFields()
//         .pagination();

//     const tours = await features.query;
//     res.status(201).json({
//         status: 'success',
//         message: 'Successfully fetched tours data',
//         length: tours.length,
//         data: {
//             toursData: tours
//         }
//     })

//     // try {
//     //     console.log(req.query);
//     // BUILT THE QUERY
//     // 1A) Filtering
//     // const queryObj = { ...req.query };
//     // const excludedFields = ['page', 'sort', 'limit', 'fields'];
//     // excludedFields.forEach(el => delete queryObj[el]);

//     // // 1B) Advanced Filtering
//     // let queryStr = JSON.stringify(queryObj);
//     // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
//     // let query = Tour.find(JSON.parse(queryStr));

//     // // ** Using another mongoose methods to filtering data
//     // // const tours = await Tour.find().where('difficulty').equals(req.query.difficulty).where('duration').equals(req.query.duration);        

//     // let query = Tour.find(queryObj);

//     // 2) SORTING
//     // if (req.query.sort) {
//     //     const sortObj = req.query.sort.split(',').join('');
//     //     query = query.sort(sortObj);
//     // } else {
//     //     query = query.sort(`-createrdAt`);
//     // }

//     // 3) Field Limiting
//     // if (req.query.fields) {
//     //     const fields = req.query.fields.split(',').join(' ');
//     //     query = query.select(fields);
//     // } else {
//     //     query = query.select('-__v')
//     // }

//     // 4) Pagination
//     // ex page=2&limit=2  1-10 page1, 11-20 page2, 21-30 page3
//     // const page = req.query.page * 1 || 1;
//     // const limit = req.query.limit * 1 || 100;
//     // const skip = (page - 1) * limit;
//     // query = query.skip(skip).limit(limit);

//     // EXCUTE QUERY
//     //     const features = new APIFeatures(Tour.find(), req.query)
//     //         .filter()
//     //         .sort()
//     //         .limitFields()
//     //         .pagination();
//     //     const tours = await features.query;
//     //     if (!tours) {
//     //         return res.status(404).json({
//     //             status: null,
//     //             message: 'no tours found'
//     //         })
//     //     }
//     //     res.status(201).json({
//     //         status: 'success',
//     //         message: 'Successfully fetched tours data',
//     //         length: tours.length,
//     //         data: {
//     //             toursData: tours
//     //         }
//     //     })
//     // } catch (err) {
//     //     res.status(404).json({
//     //         status: 'fail',
//     //         message: err
//     //     })
//     // }
// });
exports.getTourById = factory.getOne(Tour, { path: 'reviews' });
// exports.getTourById = catchAsync(async (req, res, next) => {

//     const tour = await Tour.findById(req.params.id).populate('reviews');
//     // Tour.findOne({_id: req.params.id}) would work as same as findById
//     if (!tour) {
//         return next(new ApiError('No tour found with that Id', 404));
//     }
//     res.status(200).json({
//         status: ' success',
//         message: 'Tour Data fetched succesfully',
//         data: {
//             tour: tour
//         }
//     })

//     // try {
//     //     const tour = await Tour.findById(req.params.id);
//     //     // Tour.findOne({_id: req.params.id}) would work as same as findById
//     //     if (!tour) {

//     //         return res.status(404).json({
//     //             status: null,
//     //             message: 'no tours found'
//     //         })
//     //     }

//     //     res.status(200).json({
//     //         status: ' success',
//     //         message: 'Tour Data fetched succesfully',
//     //         data: {
//     //             tour: tour
//     //         }
//     //     })

//     // } catch (err) {
//     //     res.status(404).json({
//     //         status: 'fail',
//     //         message: err
//     //     })
//     // }

// });

exports.createTour = factory.createOne(Tour);
// exports.createTour = catchAsync(async (req, res, next) => {

//     const newTour = await Tour.create(req.body);
//     res.status(201).json({
//         status: 'success',
//         data: {
//             tour: newTour
//         }
//     })

//     // try {
//     //     // const toursData = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`, 'utf-8'));
//     //     const newTour = await Tour.create(req.body);
//     //     res.status(201).json({
//     //         status: 'success',
//     //         data: {
//     //             tour: newTour
//     //         }
//     //     })
//     // } catch (err) {
//     //     res.status(404).json({
//     //         status: 'fail',
//     //         message: err
//     //     })
//     // }

// });

exports.updateTour = factory.updateOne(Tour);
// exports.updateTour = catchAsync(async (req, res, next) => {

//     const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true
//     });
//     res.status(201).json({
//         status: 'success',
//         message: 'Tour data updated successfully',
//         data: {
//             tour
//         }
//     })

//     // try {
//     //     const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//     //         new: true,
//     //         runValidators: true
//     //     });
//     //     res.status(201).json({
//     //         status: 'success',
//     //         message: 'Tour data updated successfully',
//     //         data: {
//     //             tour
//     //         }
//     //     })
//     // } catch (err) {
//     //     res.status(404).json({
//     //         status: 'fail',
//     //         message: err
//     //     })
//     // }
// });

exports.deleteTour = factory.deleteOne(Tour);

// exports.deleteTour = catchAsync(async (req, res, next) => {

//     const tour = await Tour.findByIdAndDelete(req.params.id);
//     res.status(200).json({
//         status: 'success',
//         message: 'Tour has deleted successfully'
//     })

//     // try {
//     //     const tour = await Tour.findByIdAndDelete(req.params.id);
//     //     res.status(200).json({
//     //         status: 'success',
//     //         message: 'Tour has deleted successfully'
//     //     })

//     // } catch (error) {
//     //     res.status(404).json({
//     //         status: 'fail',
//     //         message: error
//     //     })
//     // }

// });

exports.getToursStats = catchAsync(async (req, res, next) => {

    const stats = await Tour.aggregate([
        {
            $match: { ratingsAvarage: { $gte: 4.5 } }
        },
        {
            $group: {
                _id: '$difficulty',
                num: { $sum: 1 },
                numRatings: { $sum: '$ratingsQuantity' },
                avgRating: { $avg: '$ratingsAvarage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' }
            }
        },
        {
            $sort: { avgPrice: 1 }
        },
        // {
        //     $match: { _id: { $ne: 'easy' } }
        // }
    ])

    res.status(200).json({
        status: 'succes',
        message: 'Data feteched successfully',
        data: {
            stats
        }
    })

    // try {
    //     const stats = await Tour.aggregate([
    //         {
    //             $match: { ratingsAvarage: { $gte: 4.5 } }
    //         },
    //         {
    //             $group: {
    //                 _id: '$difficulty',
    //                 num: { $sum: 1 },
    //                 numRatings: { $sum: '$ratingsQuantity' },
    //                 avgRating: { $avg: '$ratingsAvarage' },
    //                 avgPrice: { $avg: '$price' },
    //                 minPrice: { $min: '$price' },
    //                 maxPrice: { $max: '$price' }
    //             }
    //         },
    //         {
    //             $sort: { avgPrice: 1 }
    //         },
    //         // {
    //         //     $match: { _id: { $ne: 'easy' } }
    //         // }
    //     ])

    //     res.status(200).json({
    //         status: 'succes',
    //         message: 'Data feteched successfully',
    //         data: {
    //             stats
    //         }
    //     })
    // } catch (err) {

    //     res.status(404).json({
    //         status: 'fail',
    //         message: err
    //     })
    // }
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {


    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }
            }
        },
        {
            $group: {
                _id: { $month: '$startDates' },
                numTourStarts: { $sum: 1 },
                tours: { $push: '$name' }
            }
        },
        {
            $addFields: { month: '$_id' }
        },
        {
            $project: {
                _id: 0
            }
        },
        {
            $sort: {
                numTourStarts: -1
            }
        },
        {
            $limit: 12
        }
    ]);
    res.status(200).json({
        status: 'success',
        message: 'data feteched successfully as per monthly plan',
        data: {
            plan
        }
    });

    // try {
    //     const year = req.params.year * 1;
    //     const plan = await Tour.aggregate([
    //         {
    //             $unwind: '$startDates'
    //         },
    //         {
    //             $match: {
    //                 startDates: {
    //                     $gte: new Date(`${year}-01-01`),
    //                     $lte: new Date(`${year}-12-31`)
    //                 }
    //             }
    //         },
    //         {
    //             $group: {
    //                 _id: { $month: '$startDates' },
    //                 numTourStarts: { $sum: 1 },
    //                 tours: { $push: '$name' }
    //             }
    //         },
    //         {
    //             $addFields: { month: '$_id' }
    //         },
    //         {
    //             $project: {
    //                 _id: 0
    //             }
    //         },
    //         {
    //             $sort: {
    //                 numTourStarts: -1
    //             }
    //         },
    //         {
    //             $limit: 12
    //         }
    //     ]);
    //     res.status(200).json({
    //         status: 'success',
    //         message: 'data feteched successfully as per monthly plan',
    //         data: {
    //             plan
    //         }
    //     });
    // } catch (err) {
    //     res.status(404).json({
    //         status: 'fail',
    //         message: err
    //     })
    // }
});

// /tours-within/:distance/center/:latlng/unit/:unit
// tours-distance?distance=233&center=40,45&unit=mi  or // tours-distance/233/center/40,45/unit/mi
exports.getToursWithIn = catchAsync(async (req, res, next) => {

    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

    if (!lat || !lng) {
        next(
            new AppError(
                'Please provide latitutr and longitude in the format lat, lng', 400

            )
        );
    }
    // console.log(distance, latlng, unit);
    const tours = await Tour.find({ startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } } });

    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            data: tours
        }
    });

});

exports.getDistances = catchAsync(async (req, res, next) => {

    const { latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

    if (!lat || !lng) {
        next(
            new AppError(
                'Please provide latitutr and longitude in the format lat, lng', 400

            )
        );
    }

    const distances = await Tour.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [lng * 1, lat * 1]
                },
                distanceField: 'distance',
                distanceMultiplier: multiplier
            }
        },
        {
            $project: {
                distance: 1,
                name: 1
            }
        }
    ])

    res.status(200).json({
        status: 'success',
        data: {
            data: distances
        }
    });
});

