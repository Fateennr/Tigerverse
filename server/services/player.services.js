const db = require('../config/db');

class PlayerServices{
    // Function to get all players
 getPlayerData = async () => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL GetAllPlayers(?, ?, ?, ?, ?)',
      ['ALL', 'ALL', 'ALL', 'ranking', 'ASC'],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0]);
      }
    );
  });
};



// Function to get highest runs for a player
 getHighestRuns = async (playerId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL GetHighestRunByPlayerID(?)',
      [playerId],
      (err, results) => {
        
        if (err) {
          return reject(err);
        }
        // Debug: See what results look like
        console.log('DB Results:', JSON.stringify(results));

        if (!results || !results[0] || results[0].length === 0) {
          return resolve(undefined);
        }

        const highestRun = results[0][0].HighestRun;
        resolve(highestRun);
      }
    );
  });
};



// Function to get highest wickets for a player
 getHighestWickets = async (playerId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL GetHighestWicketsByPlayerID(?)',
      [playerId],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0][0].HighestWickets);
      }
    );
  });
};

// Function to get matches played by a player
 getMatchesPlayed = async (playerId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL GetMatchesPlayedByPlayerID(?)',
      [playerId],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0][0].TotalMatchesPlayed);
      }
    );
  });
};

// Function to get highest dismissals for a player
 getHighestDismissals = async (playerId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'CALL GetHighestDismissalsByPlayerID(?)',
      [playerId],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0][0].HighestDismissals);
      }
    );
  });
};

    
    getAllData(query, params = []){
        return new Promise((resolve, reject) => {
            db.query(query, params, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    };

    getBattingData(playerId){
        const sql = `
        SELECT *
            FROM BattingCareerAgainst
        WHERE PlayerID = ?
        ORDER BY MatchType, Opponent, LocationType
        `;

        return new Promise((resolve, reject) => {
        db.query(sql, [playerId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
        });
    }

    getBowlingData(playerId){
        const sql = `
          SELECT *
            FROM BowlingCareerAgainst
           WHERE PlayerID = ?
           ORDER BY MatchType, Opponent, LocationType
        `;
        return new Promise((resolve, reject) => {
          db.query(sql, [playerId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
          });
        });
    }

    getFieldingData(playerId) {
        const sql = `
          SELECT *
            FROM FieldingCareer
           WHERE PlayerID = ?
           ORDER BY MatchType, Opponent, LocationType
        `;
        return new Promise((resolve, reject) => {
          db.query(sql, [playerId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
          });
        });
    };
    
};

module.exports = new PlayerServices();