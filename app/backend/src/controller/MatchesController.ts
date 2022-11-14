import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) { }

  public getAllMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.matchesService.getAllMatches();

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public getMatchesByProgress = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const result = await this.matchesService.getMatchesByProgress(inProgress === 'true');

    return res.status(200).json(result);
  };

  public saveMatch = async (req: Request, res: Response) => {
    const { body } = req;
    const { authorization } = req.headers;

    const result = await this.matchesService
      .saveMatch({ ...body, inProgress: true }, authorization as string);

    return res.status(201).json(result);
  };
}
