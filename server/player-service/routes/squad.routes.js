const express = require('express');
const router = express.Router();
const SquadController = require('../controllers/squad.controller');

router.get('/latest-squad', SquadController.getLatestSquad);
router.get('/players', SquadController.getFilteredPlayersList);

module.exports = router;