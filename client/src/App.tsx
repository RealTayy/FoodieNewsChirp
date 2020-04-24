import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { CreatePost, PostList, PostThread } from './views';
import Navbar from './components/Navbar';


function App() {
  return (
    < div className="App" >
      <Router>
        <Navbar />
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
