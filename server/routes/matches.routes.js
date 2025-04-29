const express = require('express');
const router = express.Router();
const MatchesController = require('../controllers/matches.controller');

router.get('/all', MatchesController.getFilteredMatchesList);

module.exports = router;
