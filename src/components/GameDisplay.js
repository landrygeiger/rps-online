import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContexts";

const GameDisplay = () => {
    const { gameId } = useParams();
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true); // Keep track of initial game loading
    const history = useHistory();

    const matchDocRef = db.collection("active-matches").doc(gameId);

    const loadMatch = async () => {
        // Pull match data from database
        const docSnapshot = await matchDocRef.get();

        // If match doesn't exist, redirect to main page
        if(docSnapshot.exists) {
            const data = docSnapshot.data();

            if (data.playerOne === "none" || data.playerTwo === "none") {
                // Create observer for match document
                const docObserver = matchDocRef.onSnapshot(updatedSnapshot => {
                    console.log("doc updated");
                });

                // We know that either playerOne or playerTwo is "none"
                // Check to see which one that is
                if (data.playerOne === "none") {
                    await matchDocRef.update({ playerOne: currentUser.email })
                // If assigning player two, make sure player one isn't the same player
                } else if (data.playerOne !== currentUser.email) {
                    await matchDocRef.update({ playerTwo: currentUser.email });
                } else {
                    history.push("/");
                }

                setLoading(false);

                // Return docObserver so it unsubscribes on component unmount
                return docObserver
            } else {
                history.push("/");
            }
        } else {
            history.push("/");
        }
    }

    useEffect((loadMatch), []);

    return (
        <Card className="w-100 content-card shadow" style={{height: "calc(100vh - 225px"}}>
            <Card.Body>
                { loading ? "Loading..." : "Done loading!" }
            </Card.Body>
        </Card>
    )
}

export default GameDisplay;