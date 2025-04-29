const mysquadServices = require('../services/mysquad.services');
const  mySquadServices  = require('../services/mysquad.services');


class MySquadController{
 
     async getUserSquadData (req, res){
        try {
          const data = await mysquadServices.getUserSquadData();
          res.json(data);
        } catch (err) {
          console.error('Database query error:', err);
          res.status(500).json({ error: 'Failed to fetch data' });
        }
      }

      async createUserSquad(req, res) {
        try {
          const {
            squadName,
            coachID,
            captainID,
            matchType,
            favourite,
            players,
          } = req.body;
    
          if (!squadName || !coachID || !captainID || !matchType || !players || players.length !== 11) {
            return res.status(400).json({ error: 'Invalid request: All 11 players and required fields are needed.' });
          }
    
          const result = await mysquadServices.createUserSquadWithPlayers(
            squadName,
            coachID,
            captainID,
            matchType,
            favourite,
            players
          );
    
          res.status(201).json(result);
        } catch (err) {
          console.error('Error creating squad:', err);
          res.status(500).json({ error: 'Failed to create squad' });
        }
      }

      async deleteUserSquad(req, res) {
        try {
          const squadID = req.params.id;
          const result = await mysquadServices.deleteUserSquadByID(squadID);
          res.json({ message: `Squad with ID ${squadID} deleted successfully`, result });
        } catch (err) {
          console.error('Delete squad error:', err);
          res.status(500).json({ error: 'Failed to delete squad' });
        }
      }

      async getPlayerIDAndIndexBySquadID(req, res) {
        const squadID = req.params.id;
      
        try {
          const data = await mysquadServices.getPlayerIDAndIndexBySquadID(squadID);
          res.json(data);
        } catch (err) {
          console.error('Error fetching player IDs and index:', err);
          res.status(500).json({ error: 'Failed to retrieve player data' });
        }
      }
      
      
  
}

module.exports = new MySquadController();