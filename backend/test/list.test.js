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

describe('Get api/v1/task/list', () => {
    it('Responds with a json array consists of lists in MongoDB/project', async () => {
        await request(app)
          .get('/api/v1/task/list')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
    })
});


describe('Get api/v1/task/list/default', () => {  
    it('Responds with a json object, default list', async () => {

        const expectedList = {
            name: 'default',
            tasks: [
                {
                    task: "Buy apples"
                },
                {
                    task: "Buy pears"
                },
                {
                    task: "Buy peaches"
                }
            ],
            done: false
        }

        await request(app)
          .get('/api/v1/task/list/default')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
                expect(response.body.name === expectedList.name).toBeTruthy();
                expect(response.body.tasks[0].name === expectedList.tasks[0].name).toBeTruthy();
                expect(response.body.tasks[1].name === expectedList.tasks[1].name).toBeTruthy();
                expect(response.body.tasks[2].name === expectedList.tasks[2].name).toBeTruthy();
          })
    })
});


describe('Get api/v1/task/list/id', () => {
    it('Responds with list with the given id', async () => {
        
        var id = "";

        await request(app)
          .get('/api/v1/task/list/default')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
                id = response.body.id;
        })

        await request(app)
            .get(`/api/v1/task/list/${id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.id === id).toBeTruthy();
        })
    })
});


describe('POST api/v1/task/list', () => {
    it('Post new list', async () => {

        const list = {
            name: 'test list',
            tasks: [
                {
                    task: "test task 1",
                    completed: false
                },
                {
                    task: "test task 2",
                    completed: true
                }
            ],
            done: false
        }

        var responseId = ""

        await request(app)
          .post('/api/v1/task/list')
          .set('Accept', 'application/json')
          .send(list)
          .expect('Content-Type', /json/)
          .expect(201)
          .then((response) => {
                responseId = response.body.new_list_id
          });

        await request(app)
        .delete(`/api/v1/task/list/${responseId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { message: 'Deleted' });
        
    })
});


describe('PUT api/v1/task/list', () => {
    it('Update existed list', async () => {

        const list = {
            name: 'test list',
            tasks: [
                {
                    task: "test task 1",
                    completed: false
                },
                {
                    task: "test task 2",
                    completed: true
                }
            ],
            done: false
        }

        const updatedTasks = {tasks: [
            {
                task: "test task 1",
                completed: true
            }
        ]}

        var responseId = ""

        await request(app)
          .post('/api/v1/task/list')
          .set('Accept', 'application/json')
          .send(list)
          .expect('Content-Type', /json/)
          .expect(201)
          .then((response) => {
                responseId = response.body.new_list_id
        });

        await request(app)
          .put(`/api/v1/task/list/${responseId}`)
          .set('Accept', 'application/json')
          .send(updatedTasks)
          .expect('Content-Type', /json/)
          .expect(200, {message: 'Updated'});

        await request(app)
        .delete(`/api/v1/task/list/${responseId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { message: 'Deleted' });
        
    })
});