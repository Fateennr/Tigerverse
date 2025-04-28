const  ServicesServices  = require('../services/services.services');


class ServicesController{

  async getSpan (req, res){
    try {
      const data = await ServicesServices.getServices('SELECT DISTINCT(Span) FROM Squads');
      res.json(data);
    } catch (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  }

  async getVenues (req, res){
    try {
      const data = await ServicesServices.getServices('SELECT DISTINCT(Venue) FROM Matches');
      res.json(data);
    } catch (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  }

  async getOpponents (req, res){
    try {
      const data = await ServicesServices.getServices('SELECT DISTINCT(Opponent) FROM Matches');
      res.json(data);
    } catch (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  }
}

module.exports = new ServicesController();