// server/controllers/gallery.controller.js
const galleryService = require('../services/gallery.services')

class GalleryController {
  async getAll(req, res) {
    try {
      const { category } = req.query
      const pictures = await galleryService.getPictures(category)
      return res.json(pictures)
    } catch (err) {
      console.error('❌ galleryController.getAll error:', err)
      return res
        .status(500)
        .json({ error: 'Failed to fetch gallery images' })
    }
  }
}

module.exports = new GalleryController()
