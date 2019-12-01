import React, { Fragment, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { AuthContext } from '../../contexts/Auth';
import { UserContext } from '../../contexts/User';
import { LinkContainer } from "react-router-bootstrap";
import { MdLocalDining, MdSentimentSatisfied } from "react-icons/md"

const Navigation = () => {

    const { isAuth, destroyToken } = useContext(AuthContext);
    const { user, setUser, destroyUserSession } = useContext(UserContext);
    
    useEffect(() => {
      setUser(JSON.parse(localStorage.getItem('user')));
    }, [])
    console.log(user)
    const username = user ? user.username : false;
    const routeToMyRecipes = user ? `/user/${user._id}/recipes` : '#'
    const logout = () => {
      destroyToken()
      destroyUserSession()
    }

    const authMenuBtns = isAuth ? 
    (<Fragment>
        <Dropdown>
        <Dropdown.Toggle variant="transparent" className="p-0 dropdown-menu__btn"><MdSentimentSatisfied/> {username}</Dropdown.Toggle>
        <Dropdown.Menu className="super-colors">
          <LinkContainer to="/profile/:id" activeClassName="">
            <Dropdown.Item eventKey="1">My Profile</Dropdown.Item>
          </LinkContainer>
          <LinkContainer to={routeToMyRecipes} activeClassName="">
            <Dropdown.Item eventKey="2">My Recipes</Dropdown.Item>
          </LinkContainer>
          <LinkContainer to="/recipe/create" activeClassName="">
            <Dropdown.Item eventKey="3">Create Recipe</Dropdown.Item>
          </LinkContainer>
        </Dropdown.Menu>
      </Dropdown>
      <NavLink to="/logout"
        onClick={logout}
        className="mx-3 menu-link__dash--animated">Logout
      </NavLink>
    </Fragment>) :
    (<Fragment>
          <NavLink className="mx-3 menu-link__dash--animated" to="/login">
            Login
          </NavLink>
          <NavLink className="mx-3 menu-link__dash--animated" to="/register">
            Register
          </NavLink>
    </Fragment>)


    return (
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">
          <MdLocalDining className="nav-title__icon"/>
        </Navbar.Brand>

        <Nav className="ml-auto align-items-center">
          {authMenuBtns}
          <NavLink 
              className="mx-3 menu-link__dash--animated" 
              to="/">
              Home
          </NavLink>
        </Nav>
      </Navbar>
    )
}
export default Navigation