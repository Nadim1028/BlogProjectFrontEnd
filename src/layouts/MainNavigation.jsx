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
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} to="/my-story">
          MyStories
        </Nav.Link>
        <Nav.Link as={NavLink} to="/new-story">
          CreateStory
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
         Home
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
    <Navbar collapseOnSelect bg="info" variant="light" >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <h3 className="display-8">Blog of NorWester</h3>
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