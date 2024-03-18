// task 7
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull } = require('graphql');
const lodash = require('lodash');
const Project = require('../models/project');
const Task = require('../models/task');

const TaskType = new GraphQLObjectType({
  name: 'Task',
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      weight: { type: GraphQLInt },
      description: { type: GraphQLString },
      // projectId: { type: GraphQLID },
      project: {
        type: ProjectType,
        resolve(parent, args) {
          // return _.find(projects, { id: parent.projectId });
          return Project.find({ 'id': parent.projectId })
        }
      }
    })
  });

const ProjectType = new GraphQLObjectType({
  name: 'Project',
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      weight: { type: GraphQLInt },
      description: { type: GraphQLString },
      tasks: {
        type: new GraphQLList(TaskType),
        resolve(parent, args) {
          // return _.filter(tasks, { projectId: parent.id });
          return Task.find({ 'projectId': parent.id });
        }
      }
    })
  });

  const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(tasks, { id: args.id });
        return Task.find({ 'id': args.id });
      }
    }, // Add a comma here
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(projects, { id: args.id });
        return Project.find({ 'id': args.id });
      }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent) {
        return arrayOftasks;
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent) {
        return arrayOfprojects;
      }
    }
  }
});

// mutation GraphQLObjectType
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const newProject = new Project({
          title: args.title,
          weight: args.weight,
          description: args.description
        });
        return newProject.save();
      }
    },
    addTask: {
      type: TaskType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        projectId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const newTask = new Task({
          title: args.title,
          weight: args.weight,
          description: args.description,
          projectId: args.projectId
        });
        return newTask.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: Mutation
});

// required modules
// const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLList } = require('graphql');
// const _ = require('lodash');

 // Add a closing parenthesis here

// const tasks = [
//   {
//     id: '1',
//     title: 'Create your first webpage',
//     weight: 1,
//     description: 'Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)',
//     projectId: '1'
//   },
//   {
//     id: '2',
//     title: 'Structure your webpage',
//     weight: 1,
//     description: 'Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order',
//     projectId: '2'
//   },
// ];

// const projects = [
//   {
//     id: '1',
//     title: 'Project 1',
//     weight: 1,
//     description: 'Description for project 1'
//   },
//   {
//     id: '2',
//     title: 'Project 2',
//     weight: 1,
//     description: 'Description for project 2'
//   }
// ];



// module.exports = new GraphQLSchema({
//   query: RootQueryType,
// });
