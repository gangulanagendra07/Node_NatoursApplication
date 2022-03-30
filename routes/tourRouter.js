const fs = require('fs');
const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
// const reviewController = require('../controllers/reviewController');
const reviewRouter = require('../routes/reviewRouter');

// router.param('id', tourController.checkId);
router.use(`/:tourId/reviews`, reviewRouter);

router
    .route(`/top-5-cheap`)
    .get(tourController.aliasTopTours, tourController.getAllTours);

router
    .route(`/tours-stats`)
    .get(tourController.getToursStats);

router
    .route(`/getmonthly-plan/:year`)
    .get(authController.protect, authController.restrictTo('admin', 'lead-guide', 'guide'), tourController.getMonthlyPlan);

router
    .route(`/tours-within/:distance/center/:latlng/unit/:unit`)
    .get(tourController.getToursWithIn);
// tours-distance?distance=233&center=40,45&unit=mi  or // tours-distance/233/center/40,45/unit/mi
router
    .route(`/distances/:latlng/unit/:unit`)
    .get(tourController.getDistances);
router
    .route(`/`)
    .get(authController.protect, tourController.getAllTours)
    .post(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.createTour);

router
    .route(`/:id`)
    .get(tourController.getTourById)
    .patch(tourController.updateTour)
    .delete(authController.protect,
        authController.restrictTo('admin', 'lead-guide'),
        tourController.deleteTour);

module.exports = router;