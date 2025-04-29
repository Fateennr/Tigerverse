const  playerServices  = require('../services/player.services');


class PlayerController{

  getSquadGenData = async (req, res) => {
    try {
      // Fetch all players
      const players = await playerServices.getPlayerData();
      
      
      // Map through each player and fetch related stats
      const playerPromises = players.map(async (player) => {
      const highestRuns = await playerServices.getHighestRuns(player.ID);
      
      const highestWickets = await playerServices.getHighestWickets(player.ID);
      const matchesPlayed = await playerServices.getMatchesPlayed(player.ID);
      const highestDismissals = await playerServices.getHighestDismissals(player.ID);
  
        return {
          id: player.ID,
          name: player.Name,
          role: player.PlayerRole,
          status: player.Retired ? 'retired' : 'playing',
          formats: player.Specialist ? player.Specialist : ['Test', 'ODI', 'T20'], // assuming all players play all formats for now
          stats: {
            highestRuns,
            highestWickets,
            matchesPlayed,
            highestDismissals,
          },
          image: "/placeholder.svg?height=300&width=300", // Placeholder image URL
          
        };
      });
  
      // Wait for all player data to be fetched
      const fullPlayerData = await Promise.all(playerPromises);
      res.json(fullPlayerData);
  
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };

  async getHighestRunByPlayer  (req, res)  {
    
    const playerId = 1;
   
  
    try {
      const highestRun = await playerServices.getHighestRuns(playerId);
  
      if (highestRun === undefined) {
        
        return res.status(404).json({ message: 'Player not found or no runs recorded.' });
      }
  
      res.json({
        playerId: playerId,
        highestRun: highestRun
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };

  async getAllData (req, res){
    try {
      const data = await playerServices.getAllData('SELECT * FROM Players');
      res.json(data);
    } catch (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  }
  async getDetailData(req, res) {
    const playerId = req.query.playerId;
    if (!playerId) {
      return res.status(400).json({ error: 'playerId query parameter is required' });
    }
    try {
      const data = await playerServices.getDetailData(playerId);
      res.json(data);
    } catch (err) {
      console.error('Error fetching batting career:', err);
      res.status(500).json({ error: 'Failed to fetch batting career' });
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