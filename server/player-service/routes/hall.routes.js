// routes/hall.route.js

const express = require('express');
const router = express.Router();
const hallController = require('../controllers/hall.controller');

// Usage: GET /halls/highest-total-runs?opponent=Australia&matchType=ODI&locationType=Home
router.get('/highest-total-runs',   hallController.highestTotalRuns);
router.get('/highest-score',        hallController.highestScore);
router.get('/most-centuries',       hallController.mostCenturies);
router.get('/most-half-centuries',  hallController.mostHalfCenturies);
router.get('/highest-strike-rate',  hallController.highestStrikeRate);
router.get('/highest-average',      hallController.highestAverage);
router.get('/highest-single-innings-wickets', hallController.highestSingleInningsWickets);
router.get('/best-bowling-average',           hallController.bestBowlingAverage);
router.get('/best-bowling-figures',           hallController.bestBowlingFigures);
router.get('/highest-career-wickets',         hallController.highestCareerWickets);
router.get('/most-five-wicket-hauls',         hallController.mostFiveWicketHauls);
router.get('/most-ten-wicket-hauls',          hallController.mostTenWicketHauls);

// GET /hall/most-matches-played
router.get('/most-matches-played', hallController.mostMatchesPlayedByProfile);

// GET /hall/longest-career
router.get('/longest-career',       hallController.longestCareer);

module.exports = router;
