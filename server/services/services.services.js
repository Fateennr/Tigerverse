const db = require('../config/db');

class ServicesServices{
    
    getSpan(query, params = []){
        return new Promise((resolve, reject) => {
            db.query(query, params, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    };

    getVenues(query, params = []){
        return new Promise((resolve, reject) => {
            db.query(query, params, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    };
};

module.exports = new ServicesServices();