const  playerServices  = require('../services/player.services');


class PlayerController{

  async getAllData (req, res){
    try {
      const data = await playerServices.getAllData('SELECT * FROM Players');
      res.json(data);
    } catch (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  }

  async getBattingData(req, res) {
    const playerId = req.query.playerId;
    if (!playerId) {
      return res.status(400).json({ error: 'playerId query parameter is required' });
    }
    try {
      const data = await playerServices.getBattingData(playerId);
      res.json(data);
    } catch (err) {
      console.error('Error fetching batting career:', err);
      res.status(500).json({ error: 'Failed to fetch batting career' });
    }
  }

  async getBowlingData(req, res) {
    const playerId = req.query.playerId;
    if (!playerId) {
      return res.status(400).json({ error: 'playerId query parameter is required' });
    }
    try {
      const data = await playerServices.getBowlingData(playerId);
      res.json(data);
    } catch (err) {
      console.error('Error fetching bowling career:', err);
      res.status(500).json({ error: 'Failed to fetch bowling career' });
    }
  }

  async getFieldingData(req, res) {
    const playerId = req.query.playerId;
    if (!playerId) {
      return res.status(400).json({ error: 'playerId query parameter is required' });
    }
    try {
      const data = await playerServices.getFieldingData(playerId);
      res.json(data);
    } catch (err) {
      console.error('Error fetching fielding career:', err);
      res.status(500).json({ error: 'Failed to fetch fielding career' });
    }
  }
}

module.exports = new PlayerController();