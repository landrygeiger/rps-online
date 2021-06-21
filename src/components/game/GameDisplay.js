import { useEffect, useRef, useState } from "react";
import { Card, InputGroup, FormControl, Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useSocketContext } from "../../contexts/SocketContext";
import { db } from "../../firebase";
import Loader from "../Loader";
import Scoreboard from "./Scoreboard";
import GameButtons from "./GameButtons";
import Countdown from "./Countdown";
import GameCompleteDisplay from "./GameCompleteDisplay";

const GameDisplay = () => {
    const { gameId } = useParams();
    const { currentUser } = useAuth();
    const { connected, connect, socket } = useSocketContext(); 
    const [loading, setLoading] = useState(true); // Keep track of initial game loading
    const [disabled, disableButtons] = useState(false);
    const [matchData, setMatchData] = useState();
    const [matchStatus, setMatchStatus] = useState("waiting-for-players");
    const history = useHistory();
    const copyRef = useRef();

    useEffect(() => {
        const asyncWrapper = async () => {
            const unsub = await joinGame();
            return () => {
                unsub();
                socket.emit("leave-match", gameId);
            }
        }
        return asyncWrapper();
    }, []);

    const joinGame = async () => {
        return new Promise(async (resolve, reject) => {

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
                    const unsub = db.collection("active-matches").doc(gameId).onSnapshot((doc) => {
                        setMatchData(doc.data());
                        setMatchStatus(doc.data().status);
                        setLoading(false);
                    });
                    connectedSocket.on("kick-match", () => {
                        unsub();
                        history.push("/");
                    });
                    resolve(unsub);
                } else {
                    history.push("/");
                }
            });        
        })
    }

    const handleCopy = () => {
        copyRef.current.select();
        copyRef.current.setSelectionRange(0, 99999); // mobile
        document.execCommand("copy");
    }

    return (
        <Card className="w-100 content-card shadow mb-5">
            <Card.Body className="d-flex flex-column" style={{minHeight: "500px", boxSizing: "border-box"}}>
                { !loading 
                ? <>
                    <Scoreboard matchData={matchData} />
                    <div className= "d-flex justify-content-center align-items-center flex-column" style={{flexGrow: 1}}>
                        { matchStatus.state === "waiting-for-players" ? <>
                                <p>Waiting for players...</p>
                                <InputGroup style={{maxWidth: "450px"}}>
                                    <FormControl value={window.location.href} readOnly ref={copyRef} />
                                    <Button variant="primary" onClick={handleCopy}><i className="fas fa-clipboard" /></Button>
                                </InputGroup>
                            </>
                        : matchStatus.state === "starting" ? <>
                                <p>Match starting in...</p>
                                <Countdown count={matchStatus.data.count} />
                            </>
                        : matchStatus.state === "in-progress" || matchStatus.state === "between-rounds" ? <>
                                <GameButtons disabled={disabled} socket={socket} gameId={gameId} currentUser={currentUser} 
                                    disableButtons={disableButtons} matchStatus={matchStatus} />
                                <Countdown count={matchStatus.data.count} />
                            </> 
                        : matchStatus.state === "complete" ? <>
                                <GameCompleteDisplay matchStatus={matchStatus} />
                                <Countdown count={matchStatus.data.count} />
                            </>
                        : <div>uh oh</div> }
                    </div>
                </> 
                : <Loader /> }
            </Card.Body>
        </Card>
    )
}

export default GameDisplay;