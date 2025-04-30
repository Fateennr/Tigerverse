const express = require('express');
const router = express.Router();
const MatchesController = require('../controllers/matches.controller');

router.get('/all', MatchesController.getFilteredMatchesList);
router.get('/stats/:id', MatchesController.getMatchStats);
router.get('top-scorer/:match_id',MatchesController.getTopScorer);

module.exports = router;
