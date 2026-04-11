const db = require('../config/db');

class ServicesServices{
    
    getServices(query, params = []){
        return new Promise((resolve, reject) => {
            db.query(query, params, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    };
};

module.exports = new ServicesServices();