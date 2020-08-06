import React from 'react';
import Nav from 'react-bootstrap/Nav';
import truefan from './Logo/truestan.png';

const NavMenu = () => {
  return (
    <Nav defaultActiveKey="/home" as="ul">
      <a href="/">
        <img alt="Logo" width="70px" src={truefan} />
      </a>
    </Nav>
  );
};

export default NavMenu;
