const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must be a name'],
        unique: true,
        maxlength: [40, 'A tour name must have less or equal then 40 characters'],
        minlength: [10, 'A tour name must have more or equal then 1 0 characters'],
        trim: true
        // validate: [validator.isAlpha, 'A Tour name must only contain characters']
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration'],

    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty'],
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: ' Difficulty is either: easy, medium, difficult '
        }
    },
    ratingsAvarage: {
        type: Number,
        default: 4.5,
        min: [1, 'A tour must be above 1.0'],
        max: [5, 'A tour must be below 5.0'],

    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A Tour must have a price']
    },
    priceDiscount: {
        type: Number,
        validate: {
            // this keyword only points to current doc on new document creation
            validator: function (val) {
                return val < this.price;
            },
            message: 'Discount price ({VALUE}) should below regular price'
        }
    },
    slug: String,
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have description']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })


tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;
})

// //DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next();
})

//QUERY MIDDLEWARE
// /^find/ -> this format can be accepted all find methods like findOne() & find() & findMany()
tourSchema.pre(/^find/, function (next)
// tourSchema.pre('find', function (next) 
{
    this.find({ secretTour: { $ne: true } })
    this.start = Date.now();
    next();
})

tourSchema.post(/^post/, function (docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds!`)
    next();
})

//AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {

    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
    console.log(this.pipeline());
    next();
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;