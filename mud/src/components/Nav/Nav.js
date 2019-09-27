import React from 'react';
import { Navbar, NavbarBrand, NavLink } from 'reactstrap';
import './Nav.css';

const Nav = () => {
	const Logout = (e) => {
		localStorage.clear();
	};

	return (
		<Navbar className="nav">
			<NavbarBrand>Hunter Fun</NavbarBrand>
			<NavLink onClick={Logout} href="/">
				Log Out
			</NavLink>
		</Navbar>
	);
};

export default Nav;
