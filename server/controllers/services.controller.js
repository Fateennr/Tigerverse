const  ServicesServices  = require('../services/player.services');


class ServicesController{

  async getAllFormats (req, res){
    try {
      const data = await ServicesServices.getAllFormats('SELECT * FROM Players');
      res.json(data);
    } catch (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  }
}

module.exports = new PlayerController();