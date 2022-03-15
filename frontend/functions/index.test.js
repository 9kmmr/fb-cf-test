const app = require("./index");

describe('tests', () => {
  const supertest = require('supertest');
  const agent = supertest.agent(app);
  it('test request to api', done => {
    agent
      .get('/api/test')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject({
          status: "ok",
          message: "API TEST"
        })
        done();
      });
  });

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
