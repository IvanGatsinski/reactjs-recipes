import React, { Fragment, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { AuthContext } from '../../contexts/Auth';
import { LinkContainer } from "react-router-bootstrap";

const Navigation = () => {

    const isAuth = useContext(AuthContext)

    const authMenuBtns = isAuth ? 
    (<Nav.Link to="#pricing">Logout</Nav.Link>) :
    (<Fragment>
          <NavLink className="mx-1" to="/login">
            Login
          </NavLink>
          <NavLink className="mx-1" to="/register">
            Register
          </NavLink>
    </Fragment>)

    return (
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-custom-1">More Options</Dropdown.Toggle>
          <Dropdown.Menu className="super-colors">
            <LinkContainer to="/profile/:id" activeClassName="">
              <Dropdown.Item eventKey="1">My Profile</Dropdown.Item>
            </LinkContainer>
            <LinkContainer to="/" activeClassName="">
              <Dropdown.Item eventKey="2">My Recipes</Dropdown.Item>
            </LinkContainer>
            <LinkContainer to="/" activeClassName="">
              <Dropdown.Item eventKey="3">Add Recipe</Dropdown.Item>
            </LinkContainer>

          </Dropdown.Menu>
      </Dropdown>
        <Nav className="ml-auto">
              <NavLink className="mx-1" to="/">
              Home
              </NavLink>
          {authMenuBtns}
        </Nav>
      </Navbar>
    )
}
export default Navigation