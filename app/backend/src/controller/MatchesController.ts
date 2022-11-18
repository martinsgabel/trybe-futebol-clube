import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) { }

  public getAllMatches = async (req: Request, res: Response, next: NextFunction) => {
    const { inProgress } = req.query;
    try {
      const result = await this.matchesService.getAllMatches();

      if (inProgress) {
        const resProgress = await this.matchesService.getMatchesByProgress(inProgress === 'true');

        return res.status(200).json(resProgress);
      }

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public saveMatch = async (req: Request, res: Response) => {
    const { body } = req;
    const result = await this.matchesService
      .saveMatch({ ...body, inProgress: true });

    return res.status(201).json(result);
  };

  public finishMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      await this.matchesService.finishMatch(id);

      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };

  public updateMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const updated = await this.matchesService.updateMatch(req.body, id);

      return res.status(200).json(updated);
    } catch (error) {
      next();
    }
  };
}
