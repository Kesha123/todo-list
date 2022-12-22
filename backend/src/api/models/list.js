const mongoose = require('mongoose');


const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tasks: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true}]
  },
  done: {
    type: Boolean,
    required: false
  },
})


module.exports = mongoose.model('List', listSchema);