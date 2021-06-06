import "./App.css";
import React from "react";
import { Navbar, Nav, NavItem, Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createContext, useState } from "react";
import Home from "./components/Home/Home";
import CheckOut1 from "./components/CheckOut1/CheckOut1";
import Addbook from "./components/Admin/Addbook";

import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Orders from "./components/Order/Orders";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <div className="container">
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <h3>email: {loggedInUser.email}</h3>
        <div className="App">
          <Router>
            <div className="">
              <Navbar bg="success" variant="dark" >
                <Container>
                  <Navbar.Brand as={Link} to="/">
                    Story Teller
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav"  />
                  <NavbarCollapse id="basic-navbar-nav" className=" justify-content-end">
                    <Nav className=" justify-content-end">
                      <Nav.Link as={Link} to="/home">
                        Home
                      </Nav.Link>

                      <Nav.Link as={Link} to="/checkout">
                        Checkout
                      </Nav.Link>

                      <Nav.Link as={Link} to="/order">
                        Order
                      </Nav.Link>

                      <Nav.Link as={Link} to="/admin">
                        Admin
                      </Nav.Link>


                      <Nav.Link as={Link} to="/login">
                        Login
                      </Nav.Link>
                    </Nav>
                  </NavbarCollapse>
                </Container>
              </Navbar>

              <Switch>
                <Route path="/home">
                  <Home />
                </Route>
                <PrivateRoute path="/checkout/:id">
                  <CheckOut1 />
                </PrivateRoute>
                <PrivateRoute path="/checkout">
                  <CheckOut1 />
                </PrivateRoute>
                <PrivateRoute  path="/admin">
                  <Addbook />
                </PrivateRoute >
                <PrivateRoute path="/order">
                  <Orders />
                </PrivateRoute>

                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
