// controllers/hall.controller.js

const hallService = require('../services/hall.services');
async function highestSingleInningsWickets(req, res, next) {
    try {
      const { opponent, matchType, locationType } = req.query;
      const data = await hallService.getHighestSingleInningsWickets({ opponent, matchType, locationType });
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
  
async function mostMatchesPlayedByProfile(req, res, next) {
    try {
      const data = await hallService.getMostMatchesPlayedByProfile();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
  
  async function longestCareer(req, res, next) {
    try {
      const data = await hallService.getLongestCareer();
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
  
  async function bestBowlingAverage(req, res, next) {
    try {
      const { opponent, matchType, locationType, minWkts } = req.query;
      const data = await hallService.getBestBowlingAverage({
        opponent,
        matchType,
        locationType,
        minWkts: parseInt(minWkts, 10) || 5
      });
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
  
  async function bestBowlingFigures(req, res, next) {
    try {
      const { opponent, matchType, locationType } = req.query;
      const data = await hallService.getBestBowlingFigures({ opponent, matchType, locationType });
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
  
  async function highestCareerWickets(req, res, next) {
    try {
      const { opponent, matchType, locationType } = req.query;
      const data = await hallService.getHighestCareerWickets({ opponent, matchType, locationType });
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
  
  async function mostFiveWicketHauls(req, res, next) {
    try {
      const { opponent, matchType, locationType } = req.query;
      const data = await hallService.getMostFiveWicketHauls({ opponent, matchType, locationType });
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
  
  async function mostTenWicketHauls(req, res, next) {
    try {
      const { opponent, matchType, locationType } = req.query;
      const data = await hallService.getMostTenWicketHauls({ opponent, matchType, locationType });
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
  

async function highestTotalRuns(req, res, next) {
  try {
    const { opponent, matchType, locationType } = req.query;
    const data = await hallService.getHighestTotalRuns({ opponent, matchType, locationType });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

async function highestScore(req, res, next) {
  try {
    const { opponent, matchType, locationType } = req.query;
    const data = await hallService.getHighestScore({ opponent, matchType, locationType });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

async function mostCenturies(req, res, next) {
  try {
    const { opponent, matchType, locationType } = req.query;
    const data = await hallService.getMostCenturies({ opponent, matchType, locationType });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

async function mostHalfCenturies(req, res, next) {
  try {
    const { opponent, matchType, locationType } = req.query;
    const data = await hallService.getMostHalfCenturies({ opponent, matchType, locationType });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

async function highestStrikeRate(req, res, next) {
  try {
    const { opponent, matchType, locationType } = req.query;
    const data = await hallService.getHighestStrikeRate({ opponent, matchType, locationType });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

async function highestAverage(req, res, next) {
  try {
    const { opponent, matchType, locationType } = req.query;
    const data = await hallService.getHighestAverage({ opponent, matchType, locationType });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

module.exports = { mostMatchesPlayedByProfile,
    longestCareer, highestSingleInningsWickets,
    bestBowlingAverage,
    bestBowlingFigures,
    highestCareerWickets,
    mostFiveWicketHauls,
    mostTenWicketHauls,
  highestTotalRuns,
  highestScore,
  mostCenturies,
  mostHalfCenturies,
  highestStrikeRate,
  highestAverage,
};
