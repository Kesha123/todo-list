const request = require('supertest');
const app = require('../src/app');
const mongoose = require("mongoose");

require("dotenv").config();

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODBSERVER, { useNewUrlParser: true });
});

afterEach(async () => {
    await mongoose.connection.close();
});

describe('GET /api/v1/tasks', () => {
  it('responds with a json message', async () => {
    await request(app)
      .get('/api/v1/tasks')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  })
});

describe('Get api/v1/tasks', () => {
  it('Responds with task with the given id', async () => {
      
      var id = "";

      await request(app)
        .get('/api/v1/tasks')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
              id = response.body[0]._id;
      })

      await request(app)
          .get(`/api/v1/tasks/${id}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
              expect(response.body._id === id).toBeTruthy();
      })
  })
});

describe('PATCH api/v1/tasks', () => {
  it('Update existed task, and then delete it', async () => {

      const testTask = {
          task: "test task",
          completed: false
      }

      const updatedTask = {
          completed: true
      }

      var responseId = ""

      await request(app)
        .post('/api/v1/tasks')
        .set('Accept', 'application/json')
        .send(testTask)
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
              responseId = response.body.taskId
      });

      await request(app)
        .patch(`/api/v1/tasks/${responseId}`)
        .set('Accept', 'application/json')
        .send(updatedTask)
        .expect('Content-Type', /json/)
        .expect(200, {message: 'Updated'});

      await request(app)
      .delete(`/api/v1/tasks/${responseId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { message: 'Deleted' });
      
  })
});