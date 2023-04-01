import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize/types';
import Users from '../database/models/UsersModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de rota inicial e login', () => {
  it('rota geral deve retornar status 200 com mensagem "ok" ', async () => {
    const httpResponse = await chai.request(app).get('/')
      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.deep.equal({ message: 'ok' })
  });

  it('rota /login deve retornar status 200 com mensagem "ok" ', async () => {
    const httpResponse = await chai.request(app).post('/login')
      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.deep.equal({ message: 'ok' })
  });

  it('quando o campo "email" não é informado, retornar erro', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ password: 'any_pass' })
    expect(httpResponse.status).to.equal(400)
    expect(httpResponse.body).to.deep.equal({ error: 'All fields must be filled' })
  });

  it('quando o campo "password" não é informado, retornar erro', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'email@email.com' })
    expect(httpResponse.status).to.equal(400)
    expect(httpResponse.body).to.deep.equal({ error: 'All fields must be filled' })
  });

  it('quando o email informado não consta no bando de dados retornar erros', async () => {
    sinon.stub(Model, 'findOne').resolves(null)

    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'email@email.com' })
    expect(httpResponse.status).to.equal(401)
    expect(httpResponse.body).to.deep.equal({ error: 'Incorrect email or password' })

    sinon.restore()
  });

  it('quando o email é encontrado mas a senha é incorreta', async () => {
    sinon.stub(Model, 'findOne').resolves(null)

    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: '123' })
    expect(httpResponse.status).to.equal(401)
    expect(httpResponse.body).to.deep.equal({ error: 'Incorrect email or password' })

    sinon.restore()
  });

  it('quando as credenciais estão corretas', async () => {
    const user = { id: 1, username: 'admin', email: 'any_email@email.com', password: '123456' }

    sinon.stub(Model, 'findOne').resolves(user as Users)

    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'any_email@email.com', password: '123456' })
    expect(httpResponse.status).to.equal(200)
    expect(httpResponse.body).to.have.key('token')
    expect(httpResponse.body.token).to.be.a('string')

    sinon.restore()
  });

});
