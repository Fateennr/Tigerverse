// services/hall.service.js

const db = require('../config/db');

class HallServices {
    async getMostMatchesPlayedByProfile() {
        const sql = 'CALL GetMostMatchesPlayedByProfile()';
        const [rows] = await db.promise().query(sql);
        return rows[0] || null;
      }
      async getLongestCareer() {
        const sql = 'CALL GetLongestCareer()';
        const [rows] = await db.promise().query(sql);
        return rows[0] || null;
      }
    
        async getHighestSingleInningsWickets({ opponent = null, matchType = null, locationType = null } = {}) {
          const sql = 'CALL get_highest_single_innings_wickets(?, ?, ?)';
          const params = [opponent, matchType, locationType];
          const [rows] = await db.promise().query(sql, params);
          return rows[0] || null;
        }
      
        async getBestBowlingAverage({ opponent = null, matchType = null, locationType = null, minWkts = 5 } = {}) {
          const sql = 'CALL get_best_bowling_average(?, ?, ?, ?)';
          const params = [opponent, matchType, locationType, minWkts];
          const [rows] = await db.promise().query(sql, params);
          return rows[0] || null;
        }
      
        async getBestBowlingFigures({ opponent = null, matchType = null, locationType = null } = {}) {
          const sql = 'CALL get_best_bowling_figures(?, ?, ?)';
          const params = [opponent, matchType, locationType];
          const [rows] = await db.promise().query(sql, params);
          return rows[0] || null;
        }
      
        async getHighestCareerWickets({ opponent = null, matchType = null, locationType = null } = {}) {
          const sql = 'CALL get_highest_career_wickets(?, ?, ?)';
          const params = [opponent, matchType, locationType];
          const [rows] = await db.promise().query(sql, params);
          return rows[0] || null;
        }
      
        async getMostFiveWicketHauls({ opponent = null, matchType = null, locationType = null } = {}) {
          const sql = 'CALL get_most_five_wicket_hauls(?, ?, ?)';
          const params = [opponent, matchType, locationType];
          const [rows] = await db.promise().query(sql, params);
          return rows[0] || null;
        }
      
        async getMostTenWicketHauls({ opponent = null, matchType = null, locationType = null } = {}) {
          const sql = 'CALL get_most_ten_wicket_hauls(?, ?, ?)';
          const params = [opponent, matchType, locationType];
          const [rows] = await db.promise().query(sql, params);
          return rows[0] || null;
        }
      
      
  /**
   * Get the highest total runs (with optional filters).
   * @param {Object}   options
   * @param {string?}  options.opponent     – country name or null for all
   * @param {string?}  options.matchType    – 'Test'|'ODI'|'T20' or null for all
   * @param {string?}  options.locationType – 'Home'|'Away'|'Neutral' or null for all
   */
  async getHighestTotalRuns({ opponent = null, matchType = null, locationType = null } = {}) {
    const sql = 'CALL get_highest_total_runs_by_filters(?, ?, ?)';
    const params = [opponent, matchType, locationType];
    const [rows] = await db.promise().query(sql, params);
    return rows[0] || null;
  }

  /**
   * Get the highest score in a single innings.
   */
  async getHighestScore({ opponent = null, matchType = null, locationType = null } = {}) {
    const sql = 'CALL get_highest_score_by_filters(?, ?, ?)';
    const params = [opponent, matchType, locationType];
    const [rows] = await db.promise().query(sql, params);
    return rows[0] || null;
  }

  /**
   * Get the player with most centuries.
   */
  async getMostCenturies({ opponent = null, matchType = null, locationType = null } = {}) {
    const sql = 'CALL get_most_centuries_by_filters(?, ?, ?)';
    const params = [opponent, matchType, locationType];
    const [rows] = await db.promise().query(sql, params);
    return rows[0] || null;
  }

  /**
   * Get the player with most half-centuries.
   */
  async getMostHalfCenturies({ opponent = null, matchType = null, locationType = null } = {}) {
    const sql = 'CALL get_most_half_centuries_by_filters(?, ?, ?)';
    const params = [opponent, matchType, locationType];
    const [rows] = await db.promise().query(sql, params);
    return rows[0] || null;
  }

  /**
   * Get the highest strike rate.
   */
  async getHighestStrikeRate({ opponent = 'Sri Lanka', matchType = 'T20', locationType = 'away' } = {}) {
    const sql = 'CALL get_highest_strike_rate_by_filters(?, ?, ?)';
    const params = [opponent, matchType, locationType];
    const [rows] = await db.promise().query(sql, params);
    return rows[0] || null;
  }

  /**
   * Get the highest batting average.
   */
  async getHighestAverage({ opponent = null, matchType = null, locationType = null } = {}) {
    const sql = 'CALL get_highest_average_by_filters(?, ?, ?)';
    const params = [opponent, matchType, locationType];
    const [rows] = await db.promise().query(sql, params);
    return rows[0] || null;
  }
}

module.exports = new HallServices();
