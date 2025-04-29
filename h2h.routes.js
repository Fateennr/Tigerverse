// server/routes/h2h.routes.js
const express       = require('express');
const router        = express.Router();
const H2HController = require('../controllers/h2h.controller');

// GET /h2h?opponent=NAME&matchType=TYPE&venue=VENUE
router.get('/', H2HController.getAll);

module.exports = router;
