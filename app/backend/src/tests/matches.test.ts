import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Matches from '../database/models/MatchesModel';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota /matches', () => {
  it('a rota /matches deve retornar todas as partidas', async() => {
    const mock = [
      {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Grêmio"
        }
      },
      {
        "id": 41,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Internacional"
        }
      }
    ]

    sinon.stub(Matches, 'findAll').resolves(mock as unknown as Matches[]);

    const httpResponse = await chai.request(app).get('/matches')
      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.deep.equal(mock)
    
    sinon.restore();
  })

  it('a rota /matches?inProgress=true deve retornar as partidas em progresso', async() => {
    const mockTrue = {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": true,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Grêmio"
      }
    }

    sinon.stub(Matches, 'findAll').resolves(mockTrue as unknown as Matches[]);

    const httpResponse = await chai.request(app).get('/matches?inProgress=true')
      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.deep.equal(mockTrue)
    
    sinon.restore();
  })

  it('a rota /matches?inProgress=false deve retornar as partidas em progresso', async() => {
    const mockFalse = {
      "id": 41,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Internacional"
      }
    }

    sinon.stub(Matches, 'findAll').resolves(mockFalse as unknown as Matches[]);

    const httpResponse = await chai.request(app).get('/matches?inProgress=true')
      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.deep.equal(mockFalse)
    
    sinon.restore();
  })
})