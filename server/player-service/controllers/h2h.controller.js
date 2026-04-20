// server/controllers/h2h.controller.js
const h2hService = require('../services/h2h.services');

class H2HController {
  /**
   * GET /h2h?opponent=xyz&matchType=abc&venue=def
   */
  async getAll(req, res) {
    try {
      const { opponent, matchType, venue } = req.query;

      if (!opponent) {
        return res
          .status(400)
          .json({ error: 'Query parameter "opponent" is required.' });
      }

      const stats = await h2hService.getOpponentStats({
        opponent,
        matchType,
        venueName: venue
      });

      return res.json(stats);
    } catch (err) {
      console.error('❌ H2HController.getAll error:', err);
      return res
        .status(500)
        .json({ error: 'Failed to fetch head-to-head statistics.' });
    }
  }
}

module.exports = new H2HController();
