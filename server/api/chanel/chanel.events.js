/**
 * Chanel model events
 */

'use strict';

import {EventEmitter} from 'events';
import Chanel from './chanel.model';
var ChanelEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ChanelEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Chanel.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ChanelEvents.emit(event + ':' + doc._id, doc);
    ChanelEvents.emit(event, doc);
  };
}

export default ChanelEvents;
