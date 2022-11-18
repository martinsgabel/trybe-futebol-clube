const homeBoard = `SELECT TE.team_name AS name,
SUM(CASE 
  WHEN MA.away_team_goals > MA.home_team_goals THEN 3
  WHEN MA.away_team_goals < MA.home_team_goals THEN 0
  ELSE 1 END
) AS totalPoints,
COUNT(TE.id) AS totalGames,
SUM(CASE
  WHEN MA.away_team_goals > MA.home_team_goals THEN 1
  ELSE 0 END
) AS totalVictories,
SUM(CASE
  WHEN MA.away_team_goals = MA.home_team_goals THEN 1
  ELSE 0 END
) AS totalDraws,
SUM(CASE
  WHEN MA.away_team_goals < MA.home_team_goals THEN 1
  ELSE 0 END
) AS totalLosses,
SUM(MA.away_team_goals) AS goalsFavor,
SUM(MA.home_team_goals) AS goalsOwn,
SUM(MA.away_team_goals) - SUM(MA.home_team_goals) AS goalsBalance,
FORMAT((SUM(CASE 
  WHEN MA.away_team_goals > MA.home_team_goals THEN 3
  WHEN MA.away_team_goals < MA.home_team_goals THEN 0
  ELSE 1 END
) / (COUNT(TE.id) * 3)) * 100, 2) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.teams AS TE
join TRYBE_FUTEBOL_CLUBE.matches AS MA ON TE.id = MA.home_team
WHERE in_progress = 0
GROUP BY TE.team_name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC`;

export default homeBoard;
