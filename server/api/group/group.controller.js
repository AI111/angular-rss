/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/groups              ->  index
 * POST    /api/groups              ->  create
 * GET     /api/groups/:id          ->  show
 * PUT     /api/groups/:id          ->  upsert
 * PATCH   /api/groups/:id          ->  patch
 * DELETE  /api/groups/:id          ->  destroy
 */

 'use strict';

 import jsonpatch from 'fast-json-patch';
 import Group from './group.model';
 import Chanel from '../chanel/chanel.model'
 import request from 'request';

 var debug = require('debug')('group.controller');
 function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
      .then(() => {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Groups
export function index(req, res) {
  return Group.find().exec()
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Gets a single Group from the DB
export function show(req, res) {
  return Group.findById(req.params.id).exec()
  .then(handleEntityNotFound(res))
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Creates a new Group in the DB
export function create(req, res) {
  return Group.create(req.body)
  .then(respondWithResult(res, 201))
  .catch(handleError(res));
}
// Creates a new Chanel in the DB


// Upserts the given Group in the DB at the specified ID
export function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Group.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Updates an existing Group in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Group.findById(req.params.id).exec()
  .then(handleEntityNotFound(res))
  .then(patchUpdates(req.body))
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Deletes a Group from the DB
export function destroy(req, res) {
  return Group.findById(req.params.id).exec()
  .then(handleEntityNotFound(res))
  .then(removeEntity(res))
  .catch(handleError(res));
}
// export function addChanel(req, res){
//   return Group.findById(req.params.id).exec()
//   .then(handleEntityNotFound(res))
//   .then(group => {
//     return Chanel.create(req.body).
//     then(chanel => {
//       group.chanels.push(chanel);
//       return group.save();
//     })
//   })
//   .then(respondWithResult(res))
//   .catch(handleError(res));
// }
export function addChanel(req, res) {
  var group_id = req.params.id;
  debug('addChanel',req.body)
  request
  .get('https://rss2json.com/api.json?rss_url='+req.body.feed,
   function(error, response, body){
    if(error) {
      console.log(error);
      res.status(500).send(error);
    } else {
      body=JSON.parse(body);
      // debug('addChanel response',response.statusCode, body.feed);

      let newChanel={
        feed: req.body.feed,
        title: body.feed.title,
        link: body.feed.link,
        description: body.feed.description,
        image: body.feed.image
      };
      debug('chanel',newChanel);
      return Group.findById(group_id).exec()
      .then(handleEntityNotFound(res))
      .then(group => {
        return Chanel.create(newChanel).
        then(chanel => {
          group.chanels.push(chanel);
          return group.save()
          .then(ch => {
            return Promise.resolve(chanel)
          });
        })
      })
      .then(respondWithResult(res))
      .catch(handleError(res));
    }
  });
}
export function removeChanel(req, res){
  return Group.findById(req.params.id).exec()
  .then(handleEntityNotFound(res))
  .then(group => {
    return Chanel.findById(req.body._id).exec()
    .then(chanel => {
      group.chanels.remove(chanel._id);
      return chanel.remove()
      .then(() => {
        return Promise.resolve(group)
      })
    })
  }).then(group => {
   return group.save().then(() => {
    res.status(204).end();
  })
 })

  .catch(handleError(res));
}
