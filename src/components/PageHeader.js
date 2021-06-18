import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { Button, Container, Alert, Navbar, Nav } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

// Styling for inner header container (keeps header items within an area of 1200px )
const innerStyle = {
    display: "flex",
    justifyContent: "space-between",
}

// Styling for outer header container (white bar across screen and centers inside items)
const outerStyle = {
    height: "125px",
    width: "100%",
    maxWidth: "1500px",
    margin: "0 auto",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0 0 15px 15px"
}

// Main Heading Component
const PageHeader = () => {
    const { currentUser } = useAuth();

    return (
        <Navbar bg="light" expand="md" style={{maxWidth: "1500px", borderRadius: "0 0 15px 15px"}} className="mx-auto shadow px-5">
            <Navbar.Brand style={{minHeight: "100px"}} className="d-flex align-items-center">
                <Link to="/" style={{textDecoration: "none", color: "black"}}>
                    <p className="text-title"><i className="fas fa-signal" style={{color: "#0275d8", fontSize: 17}} /> Rock Paper Scissors Online</p>
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="d-flex justify-content-end w-100">
                    <div className="d-flex justify-content-end">
                        { currentUser ? <SignOutAndProfileInputs /> : <LoginAndSignUpInputs /> }
                    </div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        /* <div className="shadow" style={outerStyle}>
            <Container style={innerStyle}>
                <Link to="/" style={{textDecoration: "none", color: "black"}}>
                    <h2><i className="fas fa-signal" style={{color: "#0275d8"}}></i> Rock Paper Scissors Online</h2>
                </Link>

                <div style={{display: "flex", alignItems: "center"}}>
                    { !currentUser ? <LoginAndSignUpInputs /> : <SignOutAndProfileInputs /> }
                </div>
            </Container>
            </div> */
    );
}

// Contains log in and sign up buttons
const LoginAndSignUpInputs = () => {
    return (
        <>
            <Link to="/login">
                <Button variant="primary"><i className="far fa-user"></i> Login</Button>
            </Link>
            <Link to="/signup">
                <Button variant="outline-primary" style={{marginLeft: "15px"}}><i className="far fa-edit"></i> Sign Up</Button>
            </Link>
        </>
    );
}

// Contains sign out and profile link "buttons"
const SignOutAndProfileInputs = () => {
    const { currentUser, signout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const history = useHistory();

    const handleSignout = async (e) => {
        try {
            setError("");
            setLoading(true);
            await signout();
            history.push("/")
        } catch {
            setError("Failed to sign out");
        }
        
        setLoading(false);
    }

    return (
        <div className="d-flex align-items-center">
            {error && <Alert variant="danger">{error}</Alert>}
            <p className="mx-3 my-auto">{currentUser.username}</p>
            <Button disabled={loading} variant="outline-primary" onClick={handleSignout}>Sign Out</Button>
        </div>
    );
}

export default PageHeader;