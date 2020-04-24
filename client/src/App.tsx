import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_POST_ALL } from './queries/posts';

function App() {
  return (
    < div className="App" >
      {console.log("GET_POST_ALL", useQuery(GET_POST_ALL))}
    This is your app
    </div >
  )
}

export default App;
