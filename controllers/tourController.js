const { listeners, listenerCount } = require('../models/TourModel');
const Tour = require('../models/TourModel');


exports.getAllTours = async (req, res) => {

    try {

        console.log(req.query);
        // BUILT THE QUERY
        // 1) Filtering
        const queryObj = { ...req.query };
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el => delete queryObj[el]);

        // 1B) Advanced Filtering

        // let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        // console.log(JSON.parse(queryStr));        

        // ** Using another mongoose methods to filtering data
        // const tours = await Tour.find().where('difficulty').equals(req.query.difficulty).where('duration').equals(req.query.duration);        

        let query = Tour.find(queryObj);

        // 2) SORTING
        // console.log(req.query.sort);
        // if (req.query.sort) {

        // let tours = await Tour.find().sort(req.query.price)
        // }

        // 3) Field Limiting

        // if (req.query.fields) {

        //     const fields = req.query.fields.split(',').join(' ');
        //     query = query.select(fields);
        // } else {
        //     query = query.select('-__v')
        // }

        // 4) Pagination
        // ex page=2&limit=2  1-10 page1, 11-20 page2, 21-30 page3
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);


        // EXCUTE QUERY
        const tours = await query;

        if (!tours) {

            return res.status(404).json({
                status: null,
                message: 'no tours found'
            })
        }

        res.status(201).json({
            status: 'success',
            message: 'Successfully fetched tours data',
            length: tours.length,
            data: {
                toursData: tours
            }
        })

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }



}

exports.getTourById = async (req, res) => {

    try {
        const tour = await Tour.findById(req.params.id);
        // Tour.findOne({_id: req.params.id}) would work as same as findById
        if (!tour) {

            return res.status(404).json({
                status: null,
                message: 'no tours found'
            })
        }

        res.status(200).json({
            status: ' success',
            message: 'Tour Data fetched succesfully',
            data: {
                tour: tour
            }
        })

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }

}

exports.createTour = async (req, res) => {

    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {

                tour: newTour
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }

}

exports.updateTour = async (req, res) => {

    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(201).json({
            status: 'success',
            message: 'Tour data updated successfully',
            data: {
                tour
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.deleteTour = async (req, res) => {

    try {

        const tour = await Tour.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'Tour has deleted successfully'
        })

    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        })
    }

}