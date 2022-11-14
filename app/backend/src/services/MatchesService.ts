import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import JWT from '../helpers/jwt';
import UnauthorizedError from '../errors/UnauthorizedError';

interface newMatch {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export default class MatchesService {
  public getAllMatches = async () => {
    const allMatches = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return allMatches;
  };

  public getMatchesByProgress = async (inProgress: boolean) => {
    const matches = await Matches.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  };

  public saveMatch = async (match: newMatch, authorization: string) => {
    const authorized = JWT.decodePassword(authorization);

    console.log(authorized);

    if (!authorized) throw new UnauthorizedError('Token must be valid');

    const newMatch = await Matches.create(match);

    return newMatch;
  };
}
