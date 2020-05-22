const request = require('supertest')
const server = require('../api/server')
const db = require( '../database/dbConfig')

beforeEach(() => {
    return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
});

test('runs the tests', () => {
    expect(true).toBeTruthy();
})
    
test('get to /jokes returns 400 without auth', async ()=> {
    const res = await request(server)
    .get('/api/jokes')
    console.log(res)
    expect(res.status).toBe(400)
})

test('get to /jokes returns an error saying you need authentication information', async () => {
    const res = await request(server)
    .get('/api/jokes')
    expect(res.error.text).toBe('{"error":"Please provide authentication information"}')
})



// test with auth
    // it('returns status 200', async() => {
    //     const reg = await request(server)
    //     .post('/api/auth/register')
    //     .send({ 
    //         username: 'dude',
    //         password: 'test'
    //     })
    //     const res = await request(server)
    //     .post('/api/auth/login')
    //     .send({
    //         username: 'dude', 
    //         password: 'test'
    //     })
    //     const getJokes = await request(server)
    //     .get('/api/jokes')
    //     console.log(getJokes.status)
    //     expect(getJokes.status).toBe(200)
    // })