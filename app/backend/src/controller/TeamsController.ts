import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) { }

  public getAllTeams = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.teamsService.getAllTeams();

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public getSpecificTeam = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.teamsService.getSpecificTeam(id);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
