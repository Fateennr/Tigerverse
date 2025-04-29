const express = require('express');
const router = express.Router();
const MySquadController = require('../controllers/mysquad.controller');


router.get('/list', MySquadController.getUserSquadData);
router.post('/create', MySquadController.createUserSquad);
router.delete('/delete/:id', MySquadController.deleteUserSquad);
router.get('/players/:id', MySquadController.getPlayerIDAndIndexBySquadID);



module.exports = router;