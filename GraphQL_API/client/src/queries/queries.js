// Import gql
import { gql } from 'apollo-boost';

export const getProjectsQuery = gql`
  {
    projects {
      id
      title
    }
  }
`;

export const getTasksQuery = gql`
  {
    tasks {
      id
      title
    }
  }
`;

export const addTaskMutation = gql`
  mutation AddTask($title: String!, $weight: Int!, $description: String!, $projectId: ID!) {
    AddTask(title: $title, weight: $weight, description: $description, projectId: $projectId) {
      id
      title
    }
  }
`;

export const getTaskDetailQuery = gql`
query GetTaskDetail($id: ID!) {
  task(id: $id) {
    id
    title
    weight
    description
    project {
      id
      title
      weight
      description
      tasks {
        id
        title
        weight
      }
    }
  }
}
`;

export default (getTaskDetailQuery, addTaskMutation);
