'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var chanelCtrlStub = {
  index: 'chanelCtrl.index',
  show: 'chanelCtrl.show',
  create: 'chanelCtrl.create',
  upsert: 'chanelCtrl.upsert',
  patch: 'chanelCtrl.patch',
  destroy: 'chanelCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var chanelIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './chanel.controller': chanelCtrlStub
});

describe('Chanel API Router:', function() {
  it('should return an express router instance', function() {
    expect(chanelIndex).to.equal(routerStub);
  });

  describe('GET /api/chanels', function() {
    it('should route to chanel.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'chanelCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/chanels/:id', function() {
    it('should route to chanel.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'chanelCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/chanels', function() {
    it('should route to chanel.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'chanelCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/chanels/:id', function() {
    it('should route to chanel.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'chanelCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/chanels/:id', function() {
    it('should route to chanel.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'chanelCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/chanels/:id', function() {
    it('should route to chanel.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'chanelCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
