import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useSocketContext } from "../../contexts/SocketContext";
import { db } from "../../firebase";
import Loader from "../Loader";
import Scoreboard from "./Scoreboard";
import GameButtons from "./GameButtons";
import Countdown from "./Countdown";
import BetweenRoundsDisplay from "./BetweenRoundsDisplay";

const GameDisplay = () => {
    const { gameId } = useParams();
    const { currentUser } = useAuth();
    const { connected, connect, socket } = useSocketContext(); 
    const [loading, setLoading] = useState(true); // Keep track of initial game loading
    const [disabled, disableButtons] = useState(false);
    const [matchData, setMatchData] = useState();
    const [matchStatus, setMatchStatus] = useState("waiting-for-players");
    const history = useHistory();

    useEffect(() => {
        joinGame();
    }, []);

    const joinGame = async () => {
        // Context state updates asynchronously so connect() doesn't update the socket variable in time
        // Hacky fix, there's probably a better way
        let connectedSocket = socket;
        if (!connected) connectedSocket = await connect();
        // Create a match join request, server remotely invokes callback telling the client
        // if the request was accepted or denied
        connectedSocket.emit("join-match", currentUser, gameId, (admitted) => {
            if (admitted) {
                // Listen to the match doc for updates and reflect those in the local match data
                // First call just returns the document, so also set loading to false
                db.collection("active-matches").doc(gameId).onSnapshot((doc) => {
                    setMatchData(doc.data());
                    setMatchStatus(doc.data().status);
                    setLoading(false);
                });
            } else {
                history.push("/");
            }
        });

        /* connectedSocket.on("start-match", () => {
            setMatchStatus("starting");
            console.log("starting now!");
        }) */
    }

    const handleClick = () => {
        socket.emit("send-move", currentUser, gameId, "scissors");
    }

    return (
        <Card className="w-100 content-card shadow" style={{height: "calc(100vh - 225px"}}>
            <Card.Body>
                { !loading 
                ? <>
                    <Scoreboard matchData={matchData} />
                    <button onClick={handleClick}>Test</button>
                    <div className= "d-flex justify-content-center align-items-center" style={{height: "520px"}}>
                        { matchStatus.state === "waiting-for-players" ? <p>Waiting for players...</p>
                        : matchStatus.state === "starting" ? <Countdown count={matchStatus.data.count} />
                        : matchStatus.state === "in-progress" ? <>
                            <GameButtons disabled={disabled} socket={socket} gameId={gameId} currentUser={currentUser} disableButtons={disableButtons} />
                            <Countdown count={matchStatus.data.count} />
                        </> 
                        : <>
                            <BetweenRoundsDisplay />
                            <Countdown count={matchStatus.data.count} />
                        </> }
                    </div>
                </> 
                : <Loader /> }
            </Card.Body>
        </Card>
    )
}

export default GameDisplay;