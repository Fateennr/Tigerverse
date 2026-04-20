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
        const [rows] = await db.query(sql, params);
        return rows[0] || [];
    }

    async getMatchStats({ id = '1' } = {}) {
        // -- put match id to generate all the summaries of 11 players
        const sql = 'CALL GetMatchPlayerStats(?)';
        const params = [id];
        const [rows] = await db.query(sql, params);
        return rows[0] || [];
    }

    async getTopScorer({ match_id = '1' } = {}) {
        // -- put match id to generate all the summaries of 11 players
        const sql = 'CALL GetMatchTopScorerName(?)';
        const params = [match_id];
        const [rows] = await db.query(sql, params);
        return rows[0] || [];
    }
};

module.exports = new MatchesServices();