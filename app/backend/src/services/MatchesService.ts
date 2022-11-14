import Matches from '../database/models/MatchesModel';

export default class MatchesService {
  public getAllMatches = async () => {
    const allMatches = await Matches.findAll();
    return allMatches;
  };
}
