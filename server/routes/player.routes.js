const express = require('express');
const router = express.Router();
const PlayerController = require('../controllers/player.controller');

router.get('/data', PlayerController.getAllData);
router.get('/batting', PlayerController.getBattingData);
router.get('/bowling', PlayerController.getBowlingData);
router.get('/fielding', PlayerController.getFieldingData);

module.exports = router;
