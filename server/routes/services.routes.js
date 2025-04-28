const express = require('express');
const router = express.Router();
const ServicesController = require('../controllers/player.controller');

router.get('/info', ServicesController.getAllData);
router.get('/batting', ServicesController.getBattingData);
router.get('/bowling', ServicesController.getBowlingData);
router.get('/fielding', ServicesController.getFieldingData);

module.exports = router;
