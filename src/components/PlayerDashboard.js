import { Card, Row, Col, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { useSocketContext } from "../contexts/SocketContext";

const PlayerDashboard = () => {
    const { currentUser } = useAuth();
    const [error, setError] = useState("");

    return (
        <div className="w-100">
            { error && <Alert variant="danger" className="shadow">{error}</Alert> }
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
                                <CreateMatch setError={setError}/>
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
const CreateMatch = (props) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const { connect, connected, socket } = useSocketContext();

    const handleClick = async () => {
        setLoading(true);
        if (!connected) connect().then((socket) => {
                createMatchRequest(socket);
            }, () => {
                props.setError("Failed to connect to server.");
                setLoading(false);
            });
        else {
            createMatchRequest(socket);
        }
    }

    const createMatchRequest = (socket) => {
        // When the server creates a match, it will remotely invoke the given callback and
        // pass in the created match's id
        socket.emit("create-match", (matchId) => {
            setLoading(false);
            history.push(`/game/${matchId}`);
        });
    }

    return (
        <Button variant="outline-primary" className="w-100" onClick={handleClick} disabled={loading}>
            <i className="fas fa-plus" /> Create Match
        </Button>
    );
}

export default PlayerDashboard;