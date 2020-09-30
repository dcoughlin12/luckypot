import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import MyFavorites from "./My-favorites/MyFavorites";
import MyRecipes from "./My-recipes/MyRecipes";
import Home from "./Home/Home";
import MyPotlucks from "./My-potlucks/MyPotlucks";
import SignupForm from "./Sign-up/SignupForm";
import SigninForm from "./Sign-in/SigninForm";
import "./NavBar.scss";

export default function NavBar(props) {
  const cookie = false;

  const { setAuth, saveLoggedUserInfo } = props;

  return (
    <Router>
      <div className="completeNav">
        <Navbar bg="dark" expand="lg">
          <Link to="/Home">
            <Navbar.Brand className="mainTitle"> LuckyPot </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="rightButtons">
              <Nav className="mr-auto"></Nav>
              {!cookie && <Link to="/SignupForm">Register</Link>}
              {!cookie && <Link to="/SigninForm">Login</Link>}
              {cookie && (
                <Nav.Link
                  onClick={() => console.log("cookie deleted, goodbye!")}
                >
                  Logout
                </Nav.Link>
              )}
              <NavDropdown title="My Features" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  <Link to="/MyPotlucks">My Potlucks</Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  <Link to="/MyRecipes">My Recipes</Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  <Link to="/MyFavorites">My Favorites</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/SignupForm">
            <SignupForm
              setAuth={setAuth}
              saveLoggedUserInfo={saveLoggedUserInfo}
            />
          </Route>
          <Route exact path="/SigninForm">
            <SigninForm
              setAuth={setAuth}
              saveLoggedUserInfo={saveLoggedUserInfo}
            />
          </Route>
          <Route exact path="/MyPotlucks">
            <MyPotlucks />
          </Route>
          <Route path="/MyRecipes">
            <MyRecipes />
          </Route>
          <Route path="/MyFavorites">
            <MyFavorites />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
