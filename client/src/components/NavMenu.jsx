import React from "react";
import Nav from "react-bootstrap/Nav";
import truefan from ".././resources/images/truestan.png";
import Toggle from "./Toggle";
const NavMenu = () => {
	return (
		<Nav defaultActiveKey="/home" as="ul">
			<a href="/">
				<img alt="Logo" width="70px" src={truefan} />
			</a>
			<Toggle />
		</Nav>
	);
};

export default NavMenu;
