// required modules
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLList } = require('graphql');
const _ = require('lodash');

const TaskType = new GraphQLObjectType({
  name: 'Task',
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      weight: { type: GraphQLInt },
      description: { type: GraphQLString },
      projectId: { type: GraphQLID },
      project: {
        type: ProjectType,
        resolve(parent, args) {
          return _.find(projects, { id: parent.projectId });
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
          return _.filter(tasks, { projectId: parent.id });
        }
      }
    })
  }); // Add a closing parenthesis here

const tasks = [
  {
    id: '1',
    title: 'Create your first webpage',
    weight: 1,
    description: 'Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)',
    projectId: '1'
  },
  {
    id: '2',
    title: 'Structure your webpage',
    weight: 1,
    description: 'Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order',
    projectId: '2'
  },
];

const projects = [
  {
    id: '1',
    title: 'Project 1',
    weight: 1,
    description: 'Description for project 1'
  },
  {
    id: '2',
    title: 'Project 2',
    weight: 1,
    description: 'Description for project 2'
  }
];

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(tasks, { id: args.id });
      }
    }, // Add a comma here
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(projects, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
});
