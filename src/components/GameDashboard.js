import { Card, Row, Col, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContexts";

const GameDashboard = () => {
    const { currentUser } = useAuth();
    return (
        <div className="w-100">
            <Row className="mb-4">
                <Col xs={7}>
                    <Card className="content-card shadow">
                        <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <h3>{currentUser.email}</h3>
                            <h4>1783 SR</h4>
                        </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="content-card shadow">
                        <Card.Body>
                            <div className="d-flex justify-content-end w-100">
                                <Button variant="primary">Create Game</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="h-100">
                <Col xs={3} className="h-100">
                    <Card className="content-card shadow" style={{height: "500px"}}>
                        <Card.Body>
                            <h4>Statistics</h4>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="content-card shadow" style={{height: "500px"}}>
                        <Card.Body>
                            <h4>Match History</h4>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default GameDashboard;