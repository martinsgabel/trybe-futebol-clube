import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) { }

  public getHomeBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const boardList = await this.leaderboardService.getHomeBoard();

      return res.status(200).json(boardList);
    } catch (error) {
      next();
    }
  };

  public getAwayBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const boardList = await this.leaderboardService.getAwayBoard();

      return res.status(200).json(boardList);
    } catch (error) {
      next();
    }
  };

  public getBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const boardList = await this.leaderboardService.getBoard();
      return res.status(200).json(boardList);
    } catch (error) {
      next();
    }
  };
}
