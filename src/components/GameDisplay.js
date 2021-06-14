import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSocketContext } from "../contexts/SocketContext";
import { db } from "../firebase";
import Loader from "./Loader";

const GameDisplay = () => {
    const { gameId } = useParams();
    const { currentUser } = useAuth();
    const { connected, connect, socket } = useSocketContext(); 
    const [loading, setLoading] = useState(true); // Keep track of initial game loading
    const [disabled, disableButtons] = useState(false);
    const [matchData, setMatchData] = useState();
    const history = useHistory();

    useEffect(() => {
        joinGame();
    }, []);

    const joinGame = async () => {
        let connectedSocket = socket;
        if (!connected) connectedSocket = await connect();
        // Create a match join request, server remotely invokes callback telling the client
        // if the request was accepted or denied
        connectedSocket.emit("join-match", currentUser, gameId, (admitted) => {
            if (admitted) {
                db.collection("active-matches").doc(gameId).onSnapshot((doc) => {
                    setMatchData(doc.data());
                    setLoading(false);
                })
            } else {
                history.push("/");
            }
        });
    }

    return (
        <Card className="w-100 content-card shadow" style={{height: "calc(100vh - 225px"}}>
            <Card.Body>
                { !loading 
                ? <>
                    <div className="d-flex justify-content-between">
                        <h2>{matchData.player1}</h2>
                        <h2>{matchData.player2}</h2>
                    </div>
                    <div className= "d-flex justify-content-center align-items-center" style={{height: "520px"}}>
                        <button className="game-button" id="rock" disabled={disabled}><i className="far fa-hand-rock" /></button>
                        <button className="game-button" id="paper" disabled={disabled}><i className="far fa-hand-paper" /></button>
                        <button className="game-button" id="scissors" disabled={disabled}><i className="far fa-hand-scissors" /></button>
                    </div>
                </> 
                : <Loader /> }
            </Card.Body>
        </Card>
    )
}

export default GameDisplay;