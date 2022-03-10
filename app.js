const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const AppError = require('./utilities/appError');
const globalErrorHandlers = require('./controllers/errorController');
const app = express();
// const req = require('express/lib/request');

// 1) GLOBAL MIDDLEWARES

// Set Security HTTP headers
app.use(helmet());

//Development logging
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
//Limit requests from same API(IP)
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, Please try again in an hour!'
})
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '100kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

//Prevent parameter polution
app.use(hpp({
    whitelist: [
        'duration',
        'ratingsQuantity',
        'ratingsAvarage',
        'maxGroupSize',
        'difficulty',
        'price'
    ]

}));

//Serving static files
app.use(express.static(`${__dirname}/public`));

// Testing middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.headers);
    next();
})

// 2) ROUTE HANDLERS
const tourRoutes = require('./routes/tourRouter');
const userRoutes = require('./routes/userRouter');

// 3) ROUTES
app.use(`/api/v1/tours`, tourRoutes);
app.use(`/api/v1/users`, userRoutes);

app.all('*', (req, res, next) => {
    next(new AppError(`Could not find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandlers);

// 4) SERVER STARTS 
module.exports = app;