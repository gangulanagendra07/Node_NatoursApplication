const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();
// const req = require('express/lib/request');

// 1) MIDDLEWARES

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    console.log("Hello from middleware");
    next();
})

app.use((req, res, next) => {
    // console.log(req.headers);
    req.requestTime = new Date().toISOString();
    next();
})



// 2) ROUTE HANDLERS

const tourRoutes = require('./routes/tourRouter');
const UserRoutes = require('./routes/userRouter');


// 3) ROUTES

app.use(`/api/v1/tours`, tourRoutes);
app.use(`/api/v1/users`, UserRoutes);


// 4) SERVER STARTS


module.exports = app;