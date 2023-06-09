import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import MatchError from '../errors/MatchError';
import MissingId from '../errors/MissingId';

interface newMatch {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

interface updateMatch {
  homeTeamGoals: number,
  awayTeamGoals: number,
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

  public saveMatch = async (match: newMatch) => {
    // checando se os times são iguais
    if (match.awayTeam === match.homeTeam) {
      throw new MatchError('It is not possible to create a match with two equal teams');
    }

    // checar se o id existe
    const idAwayTeam = await Matches.findOne({ where: { id: match.awayTeam } });

    const idHomeTeam = await Matches.findOne({ where: { id: match.homeTeam } });

    if (!idAwayTeam || !idHomeTeam) throw new MissingId('There is no team with such id!');

    // criando match
    const newMatch = await Matches.create(match);

    return newMatch;
  };

  public finishMatch = async (id: string) => {
    await Matches.update(
      { inProgress: false },
      { where: { id } },
    );
  };

  public updateMatch = async (data: updateMatch, id: string) => {
    const updated = await Matches.update(data, { where: { id } });

    return updated;
  };
}
