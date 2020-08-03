import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
//Todo: change this code to the new style of the page

const NavMenu = () => {
  return (
    <Nav defaultActiveKey="/home" as="ul">
      <Nav.Item>
        <Link to="/">Landing Page</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/play">Play</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/gameover">Game over</Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavMenu;
