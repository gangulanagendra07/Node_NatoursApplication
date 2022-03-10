const fs = require('fs');
const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

// router.param('id', tourController.checkId);

router
    .route(`/top-5-cheap`)
    .get(tourController.aliasTopTours, tourController.getAllTours);

router
    .route(`/tours-stats`)
    .get(tourController.getToursStats);

router
    .route(`/getmonthly-plan/:year`)
    .get(tourController.getMonthlyPlan);

router
    .route(`/`)
    .get(authController.protect, tourController.getAllTours)
    .post(tourController.createTour);

router
    .route(`/:id`)
    .get(tourController.getTourById)
    .patch(tourController.updateTour)
    .delete(authController.protect,
        authController.restrictTo('admin', 'lead-guide'),
        tourController.deleteTour);

module.exports = router;