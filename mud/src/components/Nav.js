import React from 'react';
import { Navbar, NavbarBrand, NavLink } from 'reactstrap';

const Nav = () => {
	const Logout = (e) => {
		localStorage.clear();
	};

	return (
		<Navbar color="light">
			<NavbarBrand>Run Fun</NavbarBrand>
			<NavLink onClick={Logout} href="/">
				Log Out
			</NavLink>
		</Navbar>
	);
};

export default Nav;
