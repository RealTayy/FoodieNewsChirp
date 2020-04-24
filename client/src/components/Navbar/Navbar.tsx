import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <Link to="/"> "Foodie News" </Link>
        <Link to="/create-post"> "Create Post" </Link>
        <Link to="/post-thread/107"> "Test Thread 107" </Link>
        <Link to="/post-thread/108"> "Test Thread 108" </Link>
      </div>
    )
  }
}

export default Navbar
