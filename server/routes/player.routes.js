const express = require('express');
const router = express.Router();
const PlayerController = require('../controllers/player.controller');

router.get('/info', PlayerController.getAllData);

router.get('/playersinfosquadgen', PlayerController.getSquadGenData);
router.get('/player/highestrun', PlayerController.getHighestRunByPlayer);

router.get('/batting', PlayerController.getBattingData);
router.get('/bowling', PlayerController.getBowlingData);
router.get('/fielding', PlayerController.getFieldingData);


module.exports = router;
