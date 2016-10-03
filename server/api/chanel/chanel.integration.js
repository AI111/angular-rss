'use strict';

var app = require('../..');
import request from 'supertest';

var newChanel;

describe('Chanel API:', function() {
  describe('GET /api/chanels', function() {
    var chanels;

    beforeEach(function(done) {
      request(app)
        .get('/api/chanels')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          chanels = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(chanels).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/chanels', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/chanels')
        .send({
          name: 'New Chanel',
          info: 'This is the brand new chanel!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newChanel = res.body;
          done();
        });
    });

    it('should respond with the newly created chanel', function() {
      expect(newChanel.name).to.equal('New Chanel');
      expect(newChanel.info).to.equal('This is the brand new chanel!!!');
    });
  });

  describe('GET /api/chanels/:id', function() {
    var chanel;

    beforeEach(function(done) {
      request(app)
        .get(`/api/chanels/${newChanel._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          chanel = res.body;
          done();
        });
    });

    afterEach(function() {
      chanel = {};
    });

    it('should respond with the requested chanel', function() {
      expect(chanel.name).to.equal('New Chanel');
      expect(chanel.info).to.equal('This is the brand new chanel!!!');
    });
  });

  describe('PUT /api/chanels/:id', function() {
    var updatedChanel;

    beforeEach(function(done) {
      request(app)
        .put(`/api/chanels/${newChanel._id}`)
        .send({
          name: 'Updated Chanel',
          info: 'This is the updated chanel!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedChanel = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedChanel = {};
    });

    it('should respond with the original chanel', function() {
      expect(updatedChanel.name).to.equal('New Chanel');
      expect(updatedChanel.info).to.equal('This is the brand new chanel!!!');
    });

    it('should respond with the updated chanel on a subsequent GET', function(done) {
      request(app)
        .get(`/api/chanels/${newChanel._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let chanel = res.body;

          expect(chanel.name).to.equal('Updated Chanel');
          expect(chanel.info).to.equal('This is the updated chanel!!!');

          done();
        });
    });
  });

  describe('PATCH /api/chanels/:id', function() {
    var patchedChanel;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/chanels/${newChanel._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Chanel' },
          { op: 'replace', path: '/info', value: 'This is the patched chanel!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedChanel = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedChanel = {};
    });

    it('should respond with the patched chanel', function() {
      expect(patchedChanel.name).to.equal('Patched Chanel');
      expect(patchedChanel.info).to.equal('This is the patched chanel!!!');
    });
  });

  describe('DELETE /api/chanels/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/chanels/${newChanel._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when chanel does not exist', function(done) {
      request(app)
        .delete(`/api/chanels/${newChanel._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
