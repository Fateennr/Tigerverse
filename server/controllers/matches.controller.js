const MatchesServices = require('../services/matches.services');

class matchesController {
  async getFilteredMatchesList(req, res) {
    try {
      const { status, format, role, sortBy, sortOrder } = req.query;
      const players = await MatchesServices.getFilteredMatchesList({ status, format, role, sortBy, sortOrder });
      res.json(players);
    } catch (err) {
      console.error('Error fetching matches:', err);
      res.status(500).json({ error: 'Failed to fetch matches' });
    }
  }

  async getMatchStats(req, res) {
    try {
      const { id } = req.query;
      const players = await MatchesServices.getMatchStats({ id });
      res.json(players);
    } catch (err) {
      console.error('Error fetching matches:', err);
      res.status(500).json({ error: 'Failed to fetch matches' });
    }
  }

  async getTopScorer(req, res) {
    try {
      const { match_id } = req.params.match_id;
      const players = await MatchesServices.getTopScorer({ match_id });
      res.json(players);
    } catch (err) {
      console.error('Error fetching matches:', err);
      res.status(500).json({ error: 'Failed to fetch matches' });
    }
  }
}

module.exports = new matchesController();
