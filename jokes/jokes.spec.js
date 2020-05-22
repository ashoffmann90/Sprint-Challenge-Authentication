const request = require('supertest')
const server = require('../api/server')
const db = require( '../database/dbConfig')

describe('jokes', () => {
    it('runs the tests', () => {
        expect(true).toBeTruthy();
    })

    describe('GET /jokes', () => {
        it('returns status 200', async() => {
            const res = await request(server)
                .get('/api/auth/login')
                .send({
                    username: 'ah',
                    password: 'pass'
                });
            const users = await request(server)
                .get('/api/jokes')
                .set('token', [res.body.token])
            expect(users.token)
            expect(res.status).toBe(200)
        })

    //     it('Obtains JSON', async() => {
    //         const res = await request(jokes).get('/api/jokes')
    //         expect(res.type).toMatch(/json/i);
    //     })
    // })
    })
})