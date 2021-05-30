import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { Button, Container, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContexts";

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
        <div className="shadow" style={outerStyle}>
            <Container style={innerStyle}>
                <Link to="/" style={{textDecoration: "none", color: "black"}}>
                    <h2><i className="fas fa-signal" style={{color: "#0275d8"}}></i> Rock Paper Scissors Online</h2>
                </Link>

                <div style={{display: "flex", alignItems: "center"}}>
                    { !currentUser ? <LoginAndSignUpInputs /> : <SignOutAndProfileInputs /> }
                </div>
            </Container>
        </div>
    );
}

// Contains log in and sign up buttons
const LoginAndSignUpInputs = () => {
    return (
        <div>
            <Link to="/login">
                <Button variant="primary"><i className="far fa-user"></i> Login</Button>
            </Link>
            <Link to="/signup">
                <Button variant="outline-primary" style={{marginLeft: "15px"}}><i className="far fa-edit"></i> Sign Up</Button>
            </Link>
        </div>
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
        <div>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="link" onClick={handleSignout}>Sign Out</Button>
            <p style={{display: "inline"}}>{currentUser.email}</p>
        </div>
    );
}

export default PageHeader;