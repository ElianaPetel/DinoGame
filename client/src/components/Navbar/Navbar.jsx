import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

function MyNavbar() {
  const { userCredentials, setUserCredentials } = React.useContext(UserContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    setUserCredentials(null);
    localStorage.removeItem("token");
    navigate("/login-signup");
  };
  return (
    <>
      <Navbar
        className="nav-wrapper"
        collapseOnSelect
        expand="sm"
        bg="dark"
        variant="dark"
      >
        <Container className="d-flex justify-content-between main-container">
          <div>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick={() => navigate("/")}>Play</Nav.Link>
                <Nav.Link onClick={() => navigate("/highscores")}>
                  High Scores
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/about")}>About Us</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>

          <div className="loggedInDivs">
            {!localStorage.getItem("token") ? (
              <Nav>
                <Nav.Link onClick={() => navigate("/login-signup")}>
                  Login/Sign-up
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link onClick={() => navigate("/profile")}>
                  Profile
                </Nav.Link>
              </Nav>
            )}{" "}
            {localStorage.getItem("token") && (
              <Nav>
                <Nav.Link onClick={() => handleLogOut()}>Log out</Nav.Link>
              </Nav>
            )}
          </div>
        </Container>
      </Navbar>
      <div className="footer">
        <div className="footer-container">
          <p>© 2023 Nadav, Eliana and Mike</p>
        </div>
      </div>
    </>
  );
}

export default MyNavbar;
