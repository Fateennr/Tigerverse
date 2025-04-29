const db = require('../config/db');

class MatchesServices{
    async getFilteredMatchesList({ venue = 'ALL', format = 'ALL', opponents = 'ALL', wintype = 'both', sortby = 'winrun', sortOrder = 'DESC' } = {}) {
        // -- comma-sep list or 'ALL'
        //   -- 'ODI','Test','T20','ALL'
        //  -- comma-sep list or 'ALL'
        //   -- 'run','wicket','both'
        //   -- 'wonbyrun','winrun','winwicket','longest','highestrun'
        //  -- 'ASC' or 'DESC'
        const sql = 'CALL GetMatchesList(?, ?, ?, ?, ?, ?)';
        const params = [venue, format, opponents, wintype, sortby, sortOrder];
        const [rows] = await db.promise().query(sql, params);
        return rows[0] || [];
    }
};

module.exports = new MatchesServices();