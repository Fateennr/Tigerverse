// server/services/gallery.services.js
const db = require('../config/db')

class GalleryService {
  /**
   * Get pictures, optionally enriched with match data when category='match'.
   * @param {string} [category]
   * @returns {Promise<Array<Object>>}
   */
  async getPictures(category) {
    // 1) No category → return all pictures
    if (!category) {
      const sqlAll = `
        SELECT
          PictureID,
          Category,
          EntityID,
          ImageURL
        FROM Picture
      `
      const [allRows] = await db.promise().query(sqlAll)
      return allRows
    }

    const cat = category.trim().toLowerCase()

    // 2) category==='match' → join into your Matches table
    if (cat === 'match') {
      const sqlMatch = `
        SELECT
          p.PictureID,
          p.ImageURL,
          m.ID                               AS MatchID,
          m.Opponent,
          m.Type                             AS MatchType,
          m.Date                             AS MatchDate,
          m.Venue,
          m.Result,
          m.Wonbywicket,
          m.Wonbyrun,
          m.Winrun,
          m.Winwicket,
          m.Score_BD_Over_Played             AS ScoreBDOvers,
          m.Score_BD_Run                     AS ScoreBDRun,
          m.Score_BD_wicket                  AS ScoreBDWickets,
          m.Score_Opp_Over_Played            AS ScoreOppOvers,
          m.Score_Opp_Run                    AS ScoreOppRun,
          m.Score_Opp_wicket                 AS ScoreOppWickets
        FROM Picture p
        JOIN Matches m
          ON p.EntityID = m.ID
        WHERE LOWER(p.Category) = ?
      `
      const [matchRows] = await db.promise().query(sqlMatch, [cat])
      return matchRows
    }

    // 3) Any other category → just pull from Picture
    const sqlCat = `
      SELECT
        PictureID,
        Category,
        EntityID,
        ImageURL
      FROM Picture
      WHERE LOWER(Category) = ?
    `
    const [catRows] = await db.promise().query(sqlCat, [cat])
    return catRows
  }
}

module.exports = new GalleryService()
