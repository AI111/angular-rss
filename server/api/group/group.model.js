'use strict';

import mongoose, {Schema} from 'mongoose';
import Chanel from '../chanel/chanel.model';

var GroupSchema = new mongoose.Schema({
  name: String,
  chanels: [{type: Schema.Types.ObjectId,ref: 'Chanel'}]
});

GroupSchema.post('remove', function(doc) {
	Chanel.remove({_id:{$in:doc.chanels}}, {multi: true},(err, result)=>{
		if (err) console.log(err);
	});
  console.log('%s has been remove', doc._id);
});

export default mongoose.model('Group', GroupSchema);
