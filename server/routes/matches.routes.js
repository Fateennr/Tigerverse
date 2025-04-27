const express = require('express');
const router = express.Router();
const MatchesController = require('../controllers/player.controller');

router.get('/batting', MatchesController.getBattingData);
router.get('/bowling', MatchesController.getBowlingData);
router.get('/fielding', null);

module.exports = router;
