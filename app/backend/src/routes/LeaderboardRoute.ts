import { Router } from 'express';
import LeaderboardController from '../controller/LeaderboardController';

const leaderboardRouter = Router();

const leaderboardController = new LeaderboardController();

leaderboardRouter
  .get('/leaderboard/home', leaderboardController.getHomeBoard)
  .get('/leaderboard/away', leaderboardController.getAwayBoard)
  .get('/leaderboard', leaderboardController.getBoard);

export default leaderboardRouter;
