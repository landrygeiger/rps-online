import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

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
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0 0 15px 15px"
}

// Main Heading Component
const PageHeader = () => {
    return (
        <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
            <div className="shadow" style={outerStyle}>
                <Container style={innerStyle}>
                    <Link to="/" style={{textDecoration: "none", color: "black"}}>
                        <h2><i className="fas fa-signal" style={{color: "#0275d8"}}></i> Rock Paper Scissors Online</h2>
                    </Link>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Link to="/login">
                            <Button variant="primary"><i className="far fa-user"></i> Login</Button>
                        </Link>
                        <Link to="/signup">
                            <Button variant="outline-primary" style={{marginLeft: "15px"}}><i className="far fa-edit"></i> Sign Up</Button>
                        </Link>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default PageHeader;