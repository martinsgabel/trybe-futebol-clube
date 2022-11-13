import { Router } from 'express';
import TeamsController from '../controller/TeamsController';

const teamsRouter = Router();

const teamsController = new TeamsController();

teamsRouter
  .get('/teams', teamsController.getAllTeams)
  .get('/teams/:id', teamsController.getSpecificTeam);

export default teamsRouter;
