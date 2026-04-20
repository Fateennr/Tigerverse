// server/routes/gallery.routes.js
console.log('💥 gallery.routes.js loaded');
const express = require('express');
const router  = express.Router();
const GalleryController = require('../controllers/gallery.controller');

router.get('/', GalleryController.getAll);

module.exports = router;
