import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import truefan from './Logo/truestan.png';

const NavMenu = () => {
  return (
    <Nav defaultActiveKey="/home" as="ul">
      <div>
        <Link to="/">
          <img alt="Logo" width="90px" src={truefan} />
        </Link>
      </div>
    </Nav>
  );
};

export default NavMenu;
