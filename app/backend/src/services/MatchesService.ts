import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
// import JWT from '../helpers/jwt';
import UnauthorizedError from '../errors/UnauthorizedError';
import MatchError from '../errors/MatchError';
import MissingId from '../errors/MissingId';

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
    if (!authorization) throw new UnauthorizedError('Token must be a valid token');

    if (match.awayTeam === match.homeTeam) {
      throw new MatchError('It is not possible to create a match with two equal teams');
    }

    // const authorized = JWT.decodePassword(authorization);

    // if (!authorized) throw new UnauthorizedError('Token must be a valid token');

    // checar se o id existe
    const idAwayTeam = await Matches.findOne({ where: { id: match.awayTeam } });

    const idHomeTeam = await Matches.findOne({ where: { id: match.homeTeam } });

    if (!idAwayTeam || !idHomeTeam) throw new MissingId('There is no team with such id!');

    // criando match
    const newMatch = await Matches.create(match);

    return newMatch;
  };
}
