import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamsModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota teams', () => {
  it('a rota /teams deve retornar todos os times', async() => {
    const mock = [
      {
        "id": 1,
        "team_name": 'Avaí/Kindermann',
      },
      {
        "id": 2,
        "team_name": 'Bahia',
      },
      {
        "id": 3,
        "team_name": 'Botafogo',
      },
    ]

    sinon.stub(Teams, 'findAll').resolves(mock as unknown as Teams[]);

    const httpResponse = await chai.request(app).get('/teams')
      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.deep.equal(mock)
    
    sinon.restore();
  })

  it('a rota /teams/:id deve retornar um time específico', async() => {
    const mock = {
      "id": '1',
      "team_name": 'Avaí/Kindermann',
    }

    sinon.stub(Teams, 'findOne').resolves(mock as unknown as Teams);

    const httpResponse = await chai.request(app).get('/teams/1')
      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.deep.equal(mock)
    
    sinon.restore();
  })

  it('a rota /teams/:id deve retornar um erro caso o id seja inexistente', async() => {
    sinon.stub(Teams, 'findOne').resolves(null);

    const httpResponse = await chai.request(app).get('/teams/1')
      expect(httpResponse.status).to.equal(404)
      expect(httpResponse.body).to.deep.equal({ message: 'Team not found!' })
    
    sinon.restore();
  })
})