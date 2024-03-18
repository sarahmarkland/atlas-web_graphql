const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  weight: Number,
  description: String,
  projectId: String
});

// Create a model for the Task collection
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
