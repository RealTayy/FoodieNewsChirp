import React from 'react';
import { BrowserRouter as Router, Route, Link, RouteComponentProps, Switch } from "react-router-dom";

import { CreatePost, PostList, PostThread } from './views';


function App() {
  return (
    < div className="App" >
      <Router>
        <Switch>
          <Route path="/" exact component={PostList} />
          <Route path="/create-post" exact component={CreatePost} />
          <Route path="/post-thread/:id" exact component={PostThread} />
          <Route component={PostList} />
        </Switch>
      </Router>
    </div >
  )
}

export default App;
