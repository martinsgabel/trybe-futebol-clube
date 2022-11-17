import { Router } from 'express';
import tokenValidation from '../middlewares/tokenValidation';
import MatchesController from '../controller/MatchesController';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter
  .get('/matches', matchesController.getAllMatches)
  .post('/matches', tokenValidation, matchesController.saveMatch)
  .patch('/matches/:id/finish', matchesController.finishMatch);

export default matchesRouter;
