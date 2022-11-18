const awayBoard = `SELECT TE.team_name AS name,
SUM(CASE 
  WHEN home_team_goals < away_team_goals THEN 3
  WHEN home_team_goals = away_team_goals THEN 1
  ELSE 0 END
) AS totalPoints,
COUNT(teams.id) AS totalGames,
SUM(CASE 
  WHEN home_team_goals < away_team_goals THEN 1
  ELSE 0 END
) AS totalVictories,
SUM(CASE 
  WHEN home_team_goals = away_team_goals THEN 1
  ELSE 0 END
) AS totalDraws,
SUM(CASE 
  WHEN home_team_goals > away_team_goals THEN 1
  ELSE 0 END
) AS totalLosses,
SUM(away_team_goals) AS goalsFavor,
SUM(home_team_goals) AS goalsOwn,
SUM(away_team_goals) - SUM(home_team_goals) AS goalsBalance,
FORMAT((SUM(CASE 
  WHEN home_team_goals < away_team_goals THEN 3
  WHEN home_team_goals = away_team_goals THEN 1
  ELSE 0 END
) / (COUNT(teams.id)*3)) * 100, 2) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.teams AS TE
join TRYBE_FUTEBOL_CLUBE.matches AS MA ON TE.id = MA.away_team
WHERE in_progress = 0
GROUP BY TE.team_name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC`;

export default awayBoard;
