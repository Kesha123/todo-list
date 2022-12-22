const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
    it('Check wheteher server is running', () => {
      request(app)
          .get('/api/v1/')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404)
    })
});
