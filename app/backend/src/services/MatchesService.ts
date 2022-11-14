import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';

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
}
