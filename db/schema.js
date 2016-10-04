const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// USERS
// ----------------------
const usersSchema = new Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  
   // example of optional fields
  name:      { type: String },
  createdAt: { type: Date, default: Date.now }

})

const sketchSchema = new Schema({
	title: {type: String},
	votes: {type: Number, default: 0},
	timerVal: {type: String, required: true}
})

const contributionSchema = new Schema({
	index: {type: Number, required: true},
	text: {type: String, required: true},
	author: {type: String, default: 'anonippotamus'},
	sketchId: {type: String, required:true}
})

module.exports = {
  User: createModel('User', usersSchema),
  Sketch: createModel('Sketch',sketchSchema),
  Contribution: createModel('Contribution',contributionSchema)
}
