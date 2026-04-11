const SquadServices = require('../services/squad.services');

class SquadController {
  async getFilteredPlayersList(req, res) {
    try {
      const { status, format, role, sortBy, sortOrder } = req.query;
      const players = await SquadServices.getFilteredPlayersList({ status, format, role, sortBy, sortOrder });
      res.json(players);
    } catch (err) {
      console.error('Error fetching players:', err);
      res.status(500).json({ error: 'Failed to fetch players' });
    }
  }

  async getLatestSquad(req, res) {
    try {
      const { format, span, sortBy, sortOrder } = req.query;
      const squad = await SquadServices.getLatestSquad({ format, span, sortBy, sortOrder });
      res.json(squad);
    } catch (err) {
      console.error('Error fetching squad:', err);
      res.status(500).json({ error: 'Failed to fetch squad' });
    }
  }
}

module.exports = new SquadController();
