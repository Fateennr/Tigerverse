const db = require('../config/db');

class SquadServices{
    async getFilteredPlayersList({ status = 'both', format = 'ALL', role = 'ALL', sortBy = 'none', sortOrder = 'ASC' } = {}) {
        // -- 'playing','retired','both'
        // -- 'ODI','Test','T20','ALL'
        // -- 'Batsman','Bowler','Wicketkeeper','ALL'
        // -- 'runs','wickets','ranking','matches','dismissals','none'
        // -- 'ASC','DESC'
        const sql = 'CALL GetPlayers(?, ?, ?, ?, ?)';
        const params = [status, format, role, sortBy, sortOrder];
        const [rows] = await db.promise().query(sql, params);
        return rows[0] || [];
    }
      
    async getLatestSquad({ format = 'ODI', span = '2024-2025', sortBy = 'ranking', sortOrder = 'ASC' } = {}) {
        const sql = 'CALL GetSquad(?, ?, ?, ?)';
        const params = [format, span, sortBy, sortOrder];
        const [rows] = await db.promise().query(sql, params);
        return rows[0] || [];
    }
};

module.exports = new SquadServices();