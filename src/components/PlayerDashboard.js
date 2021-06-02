import { Card, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContexts";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";

const PlayerDashboard = () => {
    const { currentUser } = useAuth();

    return (
        <div className="w-100">
            <Row className="mb-4">
                <Col xs={9}>
                    <Card className="content-card shadow">
                        <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <h3>{currentUser.email}</h3>
                            <h4>1783 <i className="fas fa-trophy"></i></h4>
                        </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="content-card shadow">
                        <Card.Body>
                            <div className="d-flex justify-content-end w-100">
                                <CreateMatch />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="h-100">
                <Col xs={3} className="h-100">
                    <Card className="content-card shadow" style={{height: "500px"}}>
                        <Card.Body>
                            <h4>Statistics <i className="fas fa-chart-pie"></i></h4>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="content-card shadow" style={{height: "500px"}}>
                        <Card.Body>
                            <h4>Match History <i className="fas fa-history"></i></h4>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

// Button that creates matches
const CreateMatch = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);

        // Create a document representing the new match
        const newMatchDoc = await db.collection("active-matches").add({
            playerOne: "none",
            playerTwo: "none",
            gameState: "waiting",
            playerOneMove: "none",
            playerTwoMove: "none",
            playerOneScore: 0,
            playerTwoScore: 0
        });

        // Redirect to new match once promise has been fulfilled
        setLoading(false);
        history.push(`/game/${newMatchDoc.id}`);
        console.log("here");
    }

    return (
        <Button variant="outline-primary" className="w-100" onClick={handleClick} disabled={loading}>
            <i className="fas fa-plus"></i> Create Match
        </Button>
    );
}

export default PlayerDashboard;