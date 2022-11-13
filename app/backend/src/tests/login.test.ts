import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize/types';
import Users from '../database/models/UsersModel';
// import UsersService from '../services/UsersService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de rota inicial', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

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

  /* it('quando o email é encontrado mas a senha é incorreta', async () => {
    
  });
  */

  it('quando as credenciais estão corretas', async () => {
    const user = { id: 1, username: 'admin', email: 'any_email@email.com', password: '123456' }

    beforeEach(() => sinon.stub(Model, 'findOne').resolves(user as Users))

    // beforeEach(() => sinon.stub(UsersService.prototype, 'checkPassword').returns(true))

    afterEach(() => sinon.restore())

    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'any_email@email.com', password: '123456' })
    expect(httpResponse.status).to.equal(200)
    expect(httpResponse.body).to.have.key('token')
    expect(httpResponse.body.token).to.be.a('string')
  });

});
