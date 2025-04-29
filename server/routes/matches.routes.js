const express = require('express');
const router = express.Router();
const MatchesController = require('../controllers/matches.controller');

router.get('/all', MatchesController.getFilteredMatchesList);
router.get('/stats/:id', MatchesController.getMatchStats);

module.exports = router;
