const app = require("./index");

describe('tests', () => {
  const supertest = require('supertest');
  const agent = supertest.agent(app);
  
  it('test request coins endpoint', done => {
    agent
      .get('/api/coins')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
