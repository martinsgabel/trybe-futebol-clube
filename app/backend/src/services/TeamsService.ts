import MissingId from '../errors/MissingId';
import Teams from '../database/models/TeamsModel';

export default class TeamsService {
  public getAllTeams = async () => {
    const allTeams = await Teams.findAll();
    return allTeams;
  };

  public getSpecificTeam = async (id: string) => {
    const specificTeam = await Teams.findOne({ where: { id } }) as Teams;

    if (!specificTeam) throw new MissingId('Team not found!');

    return specificTeam;
  };
}
