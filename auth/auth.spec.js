const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

beforeEach(() => {
  return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
});

// register tests
test('register POST user to /api/auth/register', async () => {
    const res = await request(server)
    .post('/api/auth/register')
    .send({ 
        username: 'guy',
        password: 'test'
    })
    // console.log(res.body)
    expect(res.body).toMatchObject({
        username: 'guy'
    })
})

test('register POST /api/auth/register to send status 201', async () => {
    const res = await request(server)
    .post('/api/auth/register')
    .send({ 
        username: 'guy', 
        password: 'test'
    })
    expect(res.status).toBe(201)
})

// login tests
test('login POST /api/auth/login to send status 201', async () => {
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
    expect(res.status).toBe(201)
})

test('login POST /api/auth/login to send a token', async () => {
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
    expect(res.status).toBe(201)
})