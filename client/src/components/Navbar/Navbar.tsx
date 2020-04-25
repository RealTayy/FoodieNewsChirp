import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd';

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">        
      {/* TODO: Add Logo..? */}
        <Menu className="Navbar__menu" theme="dark" mode="horizontal">
          <Menu.Item>
            <Link to="/">Foodie News</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/create-post">Create Post</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/post-thread/107"> "Test Thread 107" </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/post-thread/108"> "Test Thread 108" </Link>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default Navbar
