import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import truefan from './Logo/truestan.png';

//Todo: change this code to the new style of the page
const NavMenu = () => {
  return (
    <Nav defaultActiveKey="/home" as="ul">
      <div>
        <Link to="/">
          <img alt="Logo" width="100px" src={truefan} />
        </Link>
      </div>
    </Nav>
  );
};

export default NavMenu;
