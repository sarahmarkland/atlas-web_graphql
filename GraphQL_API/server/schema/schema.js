// required modules
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = require('graphql');

// Define the TaskType GraphQLObjectType
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString }
  }
});

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // resolve with data
      }
    }
  }
});

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    addTask: {
      type: TaskType,
      args: {
        title: { type: GraphQLString },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString }
      },
      resolve(parent, args) {
        // resolve with data
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});
