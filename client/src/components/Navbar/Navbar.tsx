import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
import { RouteComponentProps, withRouter } from "react-router-dom";
import SessionContext from '../../SessionContext';

const Navbar = ({ location }: RouteComponentProps) => {
  const { username, getRandomUsername } = useContext(SessionContext);
  const [selectedKey, setSelectedKey] = useState('');
  const [userName, setuserName] = useState(username)

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [])

  // TODO: Proper TS Typing
  const onClickHandler = (e: any) => {
    if (e.key === 'gen') return setuserName(getRandomUsername());
    else setSelectedKey(e.key);
  }

  return (
    <div className="Navbar">
      {/* TODO: Add Logo..? */}
      <Menu className="Navbar__menu" theme="dark" mode="horizontal" selectedKeys={[selectedKey]} onClick={onClickHandler}>
        <Menu.Item key="/">
          <Link to="/">Foodie News</Link>
        </Menu.Item>
        <Menu.Item key="/create-post">
          <Link to="/create-post">Submit Post</Link>
        </Menu.Item>
        <Menu.Item key="gen">
          Generate new username
        </Menu.Item>
        <Menu.Item key="username" disabled style={{ cursor: "auto" }}>
          Username: {userName}
        </Menu.Item>

      </Menu>
    </div>
  )
}

export default withRouter(Navbar);
