import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";

import AuthContext from "../auth/AuthContext";
import Logout from "../auth/Logout";

function MainNavigation() {
  const authCtx = useContext(AuthContext);

  const loggedIn = authCtx.username !== "" && authCtx.token !== "";

  let content;

  if (loggedIn) {
    content = (
      <Nav>
        <Nav.Link as={NavLink} to="/">
          All Stories
        </Nav.Link>
        <Nav.Link as={NavLink} to="/my-story">
          My Stories
        </Nav.Link>
        <Nav.Link as={NavLink} to="/new-story">
          Add New Story
        </Nav.Link>
        <Nav.Link as={NavLink} to="/search">
          Search
        </Nav.Link>
      </Nav>
    );
  }

  if (!loggedIn) {
    content = (
      <Nav>
        <Nav.Link as={NavLink} to="/">
          All Stories
        </Nav.Link>
        <Nav.Link as={NavLink} to="/register">
          Register
        </Nav.Link>

        <Nav.Link as={NavLink} to="/login">
          LogIn
        </Nav.Link>
      </Nav>
    );
  }

  return (
    <Navbar collapseOnSelect bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <h3 className="display-6">News Stories</h3>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-center">
          {content}
        </Navbar.Collapse>
        {loggedIn ? <Logout /> : <p></p>}
      </Container>
    </Navbar>
  );
}

export default MainNavigation;