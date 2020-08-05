import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import truefan from './Logo/truestan.png';

const NavMenu = () => {
  return (
    <Nav defaultActiveKey="/home" as="ul">
      <a href="/">
        <img alt="Logo" width="90px" src={truefan} />
      </a>
    </Nav>
  );
};

export default NavMenu;
