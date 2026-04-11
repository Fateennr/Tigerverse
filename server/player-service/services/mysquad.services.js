const db = require('../config/db');

class MySquadServices{
    getUserSquadData = async () => {
        return new Promise((resolve, reject) => {
          db.query(
            'CALL GetUserSquads();',
            (err, results) => {
              if (err) {
                return reject(err);
              }
              resolve(results[0]);
            }
          );
        });
      };

      getPlayerIDAndIndexBySquadID = async (squadID) => {
        return new Promise((resolve, reject) => {
          db.query('CALL GetPlayerIDAndIndexBySquadID(?);', [squadID], (err, results) => {
            if (err) {
              return reject(err);
            }
            resolve(results[0]); // result set is in first index
          });
        });
      };

      createUserSquadWithPlayers = async (
        squadName,
        coachID,
        captainID,
        matchType,
        favourite,
        players
      ) => {
        return new Promise((resolve, reject) => {
          // Extract player IDs and positions into an array of parameters
          const playerParams = players.map(p => [p.playerID, p.index]).flat();
    
          // If fewer than 11 players, fill with NULLs to match parameter count
          while (playerParams.length < 22) {
            playerParams.push(null, null);
          }
    
          const params = [squadName, coachID, captainID, matchType, favourite, ...playerParams];
    
          const placeholders = Array(params.length).fill('?').join(',');
    
          db.query(
            `CALL CreateUserSquadWithPlayers(${placeholders})`,
            params,
            (err, results) => {
              if (err) return reject(err);
              resolve({ success: true });
            }
          );
        });
      };

      deleteUserSquadByID = async (squadID) => {
        return new Promise((resolve, reject) => {
          const query = 'CALL DeleteUserSquadByID(?);';
          db.query(query, [squadID], (err, results) => {
            if (err) return reject(err);
            resolve(results);
          });
        });
      };
      
};

module.exports = new MySquadServices();