const express = require('express');
const router = express.Router();
const ServicesController = require('../controllers/services.controller');

router.get('/span', ServicesController.getSpan);
router.get('/venues', ServicesController.getVenues);

module.exports = router;
