import awayBoard from '../helpers/boardAway';
import Model from '../database/models/index';
import homeBoard from '../helpers/boardHome';
import boardQuery from '../helpers/board';

export default class LeaderboardService {
  constructor(private model = Model) { }

  public getHomeBoard = async () => {
    const [homeBoardRes] = await this.model.query(homeBoard);

    return homeBoardRes;
  };

  public getAwayBoard = async () => {
    const [awayBoardRes] = await this.model.query(awayBoard);

    return awayBoardRes;
  };

  public getBoard = async () => {
    const [board] = await this.model.query(boardQuery);

    return board;
  };
}
