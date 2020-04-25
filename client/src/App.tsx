import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CreatePost, PostList, PostThread } from './views';
import { Layout, Space } from 'antd';
import Navbar from './components/Navbar';
import "./App.scss"

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout className="App">
        <Header className="App__header">
          <Navbar />
        </Header>
        <Content className="App__content">
          <Switch>
            <Route path="/" exact component={PostList} />
            <Route path="/create-post" exact component={CreatePost} />
            <Route path="/post-thread/:id" exact component={PostThread} />
            <Route component={PostList} />
          </Switch>
        </Content>
        <Footer className="App__footer" >Foodie News ©2020 Made by your local Foodies</Footer>
      </Layout>
    </Router>
  )
}

export default App;
