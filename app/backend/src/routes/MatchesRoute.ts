import { Router } from 'express';
import MatchesController from '../controller/MatchesController';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter
  .get('/matches', matchesController.getAllMatches)
  .post('/matches', matchesController.saveMatch);

export default matchesRouter;
