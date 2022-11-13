import Teams from '../database/models/TeamsModel';

export default class TeamsService {
  public getAllTeams = async () => {
    const allTeams = await Teams.findAll();
    return allTeams;
  };

  public getSpecificTeam = async (id: string) => {
    const specificTeam = await Teams.findOne({ where: { id } }) as Teams;

    return specificTeam;
  };
}
