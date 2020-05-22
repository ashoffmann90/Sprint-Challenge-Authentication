const request = require('supertest')
const server = require('../api/server')
const db = require( '../database/dbConfig')

beforeEach(() => {
    return db.migrate
      .rollback()
      .then(() => db.migrate.latest())
      .then(() => db.seed.run());
  });

describe('jokes', () => {
    it('runs the tests', () => {
        expect(true).toBeTruthy();
    })

    describe('GET /jokes', () => {
        it('returns status 200', async() => {
            const reg = await request(server)
            .post('/api/auth/register')
            .send({ 
                username: 'dude',
                password: 'test'
            })
            const res = await request(server)
            .post('/api/auth/login')
            .send({
                username: 'dude', 
                password: 'test'
            })
            const getJokes = await request(server)
            .get('/api/jokes')
            console.log(getJokes.status)
            expect(getJokes.status).toBe(200)
        })

    })
})