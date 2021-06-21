import { Card, Row, Col, Button, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { useSocketContext } from "../../contexts/SocketContext";
import { db } from "../../firebase";
import AnimatedNumber from "react-animated-numbers";
import PlayedMatchList from "./PlayedMatchList";
import Loader from "../Loader";

const PlayerDashboard = (props) => {
    const { currentUser } = useAuth();
    const [error, setError] = useState("");
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const userDoc = await db.collection("users").doc(props.uid).get();
            setUserData(userDoc.data());
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div className="w-100">
            { error && <Alert variant="danger" className="shadow">{error}</Alert> }
            <Row>
                <Col md={9} className="mb-3">
                    <Card className="content-card shadow">
                        <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="text-title">{currentUser.username}</p>
                            <div className="d-flex align-items-center text-title">{ loading ? "----" : <AnimatedNumber animateToNumber={userData.ranking}/>} <i className="fas fa-trophy mx-1" style={{fontSize: 16}}></i></div>
                        </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-3">
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
                <Col md={3} className="h-100 mb-3">
                    <Card className="content-card shadow" style={{height: "500px"}}>
                        <Card.Body>
                            <p className="text-title">Statistics <i className="fas fa-chart-pie" style={{fontSize: 16}}></i></p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-3">
                    <Card className="content-card shadow" style={{height: "500px"}}>
                        <Card.Body>
                            <p className="text-title">Match History <i className="fas fa-history" style={{fontSize: 16}}></i></p>
                            { loading ? <Loader /> : <PlayedMatchList userData={userData}/> }
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