// server/services/h2h.services.js
const db = require('../config/db');

class H2HService {
  /**
   * Calls the MySQL function GetOpponentStats(opponentName, matchType, venueName)
   * and returns its JSON result.
   *
   * @param {Object}  opts
   * @param {string=} opts.opponent   – opponent team name
   * @param {string=} opts.matchType  – match type filter
   * @param {string=} opts.venueName  – venue filter
   * @returns {Promise<Object|null>}
   */
  async getOpponentStats({ opponent = null, matchType = null, venueName = null } = {}) {
    const sql    = 'SELECT GetOpponentStats(?, ?, ?) AS stats';
    const params = [opponent, matchType, venueName];
    const [rows] = await db.query(sql, params);
    return rows[0]?.stats ?? null;
  }

  /**
   * Example of another stored‐proc‐style method
   *
   * @param {Object}  opts
   * @param {string=} opts.opponent     – opponent team name
   * @param {string=} opts.matchType    – match type filter
   * @param {string=} opts.locationType – venue or location filter
   * @returns {Promise<Object|null>}
   */
  async getHighestSingleInningsWickets({ opponent = null, matchType = null, locationType = null } = {}) {
    const sql    = 'CALL get_highest_single_innings_wickets(?, ?, ?)';
    const params = [opponent, matchType, locationType];
    const [resultSets] = await db.query(sql, params);
    // Stored procs return an array of result‐sets; pick the first row
    return resultSets[0] || null;
  }
}

module.exports = new H2HService();
