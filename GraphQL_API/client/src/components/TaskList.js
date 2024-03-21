// import { useState } from 'react';
import TaskDetails from './TaskDetails';
import { graphql } from 'react-apollo';
import {gql} from 'apollo-boost';

function TaskList(props) {
  // const [state, setState] = useState({
  //   selected: null
  // });

  return ( 
    <div>
      <ul id="task-list">
        {}
      </ul>
      <TaskDetails/> 
    </div>
  );
}

const getTasksQuery = gql`
{
  tasks{
    title
    id
   }
}
`;

export default graphql(getTasksQuery)(TaskList);
