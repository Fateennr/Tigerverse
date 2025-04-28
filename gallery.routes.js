// server/routes/gallery.routes.js
const express = require('express')
const router  = express.Router()
const GalleryController = require('../controllers/gallery.controller')

// single route handles both no‐param & ?category=...
router.get('/', GalleryController.getAll)

module.exports = router
