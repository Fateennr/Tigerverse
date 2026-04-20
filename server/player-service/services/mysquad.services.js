const db = require('../config/db');

class MySquadServices {
  getUserSquadData = async () => {
    const [results] = await db.query('CALL GetUserSquads();');
    return results[0];
  };

  getPlayerIDAndIndexBySquadID = async (squadID) => {
    const [results] = await db.query('CALL GetPlayerIDAndIndexBySquadID(?);', [squadID]);
    return results[0];
  };

  createUserSquadWithPlayers = async (
    squadName,
    coachID,
    captainID,
    matchType,
    favourite,
    players
  ) => {
    const playerParams = players.map((p) => [p.playerID, p.index]).flat();

    while (playerParams.length < 22) {
      playerParams.push(null, null);
    }

    const params = [squadName, coachID, captainID, matchType, favourite, ...playerParams];
    const placeholders = Array(params.length).fill('?').join(',');

    await db.query(
      `CALL CreateUserSquadWithPlayers(${placeholders})`,
      params
    );

    return { success: true };
  };

  deleteUserSquadByID = async (squadID) => {
    const [results] = await db.query('CALL DeleteUserSquadByID(?);', [squadID]);
    return results;
  };
}

module.exports = new MySquadServices();