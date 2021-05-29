import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavbarBrand,
	NavItem,
	NavLink,
	Button,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Container
} from 'reactstrap';

import '../css/nav.css';

const Header = (props) => {
	const { reduxLogin, reduxLogout } = props;

	const [ isOpen, setIsOpen ] = useState(false);
	const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

	console.log('isauthenticated', isAuthenticated);
	console.log('isauthenticated', window.location.pathname);

	const toggle = () => setIsOpen(!isOpen);

	const logoutWithRedirect = () => {
		reduxLogout();
		logout({
			returnTo: window.location.origin
		});
	};

	return (
		<Navbar color="light" light expand="md" className="custom-nav">
			<Container className="custom-nav">
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar className="flex-end">
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink to="/" exact activeClassName="router-link-exact-active" tag={RouterNavLink}>
								Home
							</NavLink>
						</NavItem>
						{!isAuthenticated && (
							<NavItem>
								<Button
									id="qsLoginBtn"
									color="primary"
									className="btn-margin"
									onClick={() => {
										loginWithRedirect();
										reduxLogin();
									}}
								>
									Log in
								</Button>
							</NavItem>
						)}
					</Nav>
					<Nav className="d-none d-md-block" navbar>
						{isAuthenticated && (
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret id="profileDropDown">
									<img
										src={user.picture}
										alt="Profile"
										className="nav-user-profile rounded-circle"
										width="50"
									/>
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem header>{user.name}</DropdownItem>
									<DropdownItem
										id="qsLogoutBtn"
										onClick={() => {
											logoutWithRedirect();
											reduxLogin();
										}}
									>
										Log out
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						)}
					</Nav>
					{/* {!isAuthenticated && (
						<Nav className="d-md-none" navbar>
							<NavItem>
								<Button id="qsLoginBtn" color="primary"  onClick={() => loginWithRedirect({})}>
									Log in
								</Button>
							</NavItem>
						</Nav>
					)}
					{isAuthenticated && (
						<Nav className="d-md-none justify-content-between" navbar style={{ minHeight: 170 }}>
							<NavItem>
								<span className="user-info">
									<img
										src={user.picture}
										alt="Profile"
										className="nav-user-profile d-inline-block rounded-circle mr-3"
										width="50"
									/>
									<h6 className="d-inline-block">{user.name}</h6>
								</span>
							</NavItem>
							<NavItem>
								<RouterNavLink to="#" id="qsLogoutBtn" onClick={() => logoutWithRedirect()}>
									Log out
								</RouterNavLink>
							</NavItem>
						</Nav>
					)} */}
				</Collapse>
			</Container>
		</Navbar>
	);
};

const sToP = (state) => ({});

const dToP = (dispatch) => ({
	reduxLogin: (userData) =>
		dispatch({
			type: 'LOGIN',
			payload: userData
		}),
	reduxLogout: () =>
		dispatch({
			type: 'LOGOUT'
		})
});

export default connect(sToP, dToP)(Header);