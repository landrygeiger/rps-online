import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContexts";
import Loader from "./Loader";

const GameDisplay = () => {
    const { gameId } = useParams();
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true); // Keep track of initial game loading
    const [matchData, setMatchData] = useState();
    const [disabled, disableButtons] = useState(false);
    const [player, setPlayer] = useState();
    const history = useHistory();

    const matchDocRef = db.collection("active-matches").doc(gameId);

    const loadMatch = async () => {
        // Pull match data from database
        const docSnapshot = await matchDocRef.get();

        // If match doesn't exist, redirect to main page
        if(docSnapshot.exists) {
            const data = docSnapshot.data();
            setMatchData(data);

            if (data.playerOne === "none") {
                setPlayer("one");
                await matchDocRef.update({ playerOne: currentUser.email });
            } else if (data.playerTwo === "none" && data.playerOne !== currentUser.email) {
                setPlayer("two");
                await matchDocRef.update({ playerTwo: currentUser.email });
            // Kick the user if there aren't any open spots and they aren't playing
            } else if (currentUser.email !== data.playerOne && currentUser.email !== data.playerTwo) {
                history.push("/");
                return
            } else if (currentUser.email === data.playerOne) {
                setPlayer("one");
            } else if (currentUser.email === data.playerTwo) {
                setPlayer("two");
            }

            // Create observer for match document
            const docObserver = matchDocRef.onSnapshot(updatedSnapshot => {
                setMatchData(updatedSnapshot.data());
            });

            setLoading(false);

            // Return for clean up by hook on unmount
            return docObserver
        } else {
            history.push("/");
        }
    }

    useEffect((loadMatch), []);

    const handleClick = async (e) => {
        disableButtons(true);
        console.log(e.target.id);
        document.getElementById(e.target.id).style.backgroundColor = "#0275d8";

        if (player === "one") {
            await matchDocRef.update({ playerOneMove: e.target.id });
        } else {
            await matchDocRef.update({ playerTwoMove: e.target.id });
        }
    }

    return (
        <Card className="w-100 content-card shadow" style={{height: "calc(100vh - 225px"}}>
            <Card.Body>
                { !loading 
                ? <>
                    <div className="d-flex justify-content-between">
                        <h2>{matchData.playerOne}</h2>
                        <h2>{matchData.playerTwo === "none" ? "Waiting for player..." : matchData.playerTwo}</h2>
                    </div>
                    <div className= "d-flex justify-content-center align-items-center" style={{height: "520px"}}>
                        <button className="game-button" id="rock" onClick={handleClick} disabled={disabled}><i className="far fa-hand-rock" /></button>
                        <button className="game-button" id="paper" onClick={handleClick} disabled={disabled}><i className="far fa-hand-paper" /></button>
                        <button className="game-button" id="scissors" onClick={handleClick} disabled={disabled}><i className="far fa-hand-scissors" /></button>
                    </div>
                </> 
                : <Loader /> }
            </Card.Body>
        </Card>
    )
}

export default GameDisplay;