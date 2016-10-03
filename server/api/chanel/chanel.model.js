'use strict';

import mongoose from 'mongoose';
import Group from '../group/group.model';

var ChanelSchema = new mongoose.Schema({
  name: String,
  feed: String,
  title: String,
  link: String,
  description:String,
  image:String
});
// ChanelSchema.post('remove', function(doc) {
// 	Group.findById
// });
export default mongoose.model('Chanel', ChanelSchema);
