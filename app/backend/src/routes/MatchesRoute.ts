import { Router } from 'express';
import MatchesController from '../controller/MatchesController';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter
  .get('/matches', matchesController.getAllMatches);

export default matchesRouter;
