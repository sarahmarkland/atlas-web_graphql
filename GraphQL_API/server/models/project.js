const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  weight: Number,
  description: String
});

// Create a model for the Project collection
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;