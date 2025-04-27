const db = require('../config/db');

class PlayerServices{
    fetchData(query, params = []){
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