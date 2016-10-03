'use strict';

import User from './user.model';
import Group from '../group/group.model';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
var debug = require('debug')('user.controller');

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.find({}, '-salt -password').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save()
    .then((user) => {
      var token = jwt.sign({_id: user._id}, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({token});
    })
    .catch(validationError(res));
}
/**
 * Get list of groups
 * chanels populating
 */
export function getChanelGroups(req, res, next) {
  var userId = req.user._id;
  debug('getChanelGroups', userId);
  return User.findById(userId).populate({
    path: 'groups',
    model: 'Group',
    populate: [{
      path: 'chanels'
    }]
  }).exec()
    .then(user => {
      debug('user groups', user.groups);
      if (!user) {
        return res.status(404).end();
      }
      debug('getChanelGroups return', user.groups);
      return res.json(user.groups);
    }).catch(err => next(err));
}

export function createGroup(req, res) {
  var userId = req.user._id;
  return Group.create(req.body)
  .then(group => {
    return User.findById(userId).exec()
    .then(user => {
      user.groups.push(group);
      return user.save()
      .then(()=> {
        return res.status(201).json(group);
      });
    });
  }).catch(handleError(res));
}
export function removeGroup(req, res) {
  var userId = req.user._id;
  var groupId = req.params.id;
  return User.findById(userId).exec()
    .then(user => {
      user.groups.remove(groupId);
      return user.save()
        .then(() => {
          return Group.remove({_id: groupId}, (err)=>{
            if (err) return Promise.reject(err);
            return res.status(204).end();
          });
        });
    }).catch(handleError(res));
}
/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  return User.findById(userId).exec()
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;
  return User.findOne({_id: userId}, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      return res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res) {
  res.redirect('/');
}
