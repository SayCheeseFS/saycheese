/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com';

    beforeEach(() => {
      return User.create({
        email: codysEmail
      });
    });

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200);


      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')

  describe('GET /api/users/:userId', () => {
    const userEmail = 'user123@mail.com'
    let userId

    beforeEach(() => {
      const newUser = User.create({
        email: userEmail
      })
      userId = newUser.id
    })

    afterEach(() => {
      User.destroy({
        where: {
          id: userId
        }
      })
    })

    it('GET /api/user/:userId', async () => {
      const res = await request(app)
        .get(`/api/users/${userId}`)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.email).to.be.equal(userEmail)
    })
  }) // end describe('GET /api/users/:userId')
}) // end describe('User routes')
