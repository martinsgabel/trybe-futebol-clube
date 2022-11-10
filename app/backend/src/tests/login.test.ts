import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

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
});
