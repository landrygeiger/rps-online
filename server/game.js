const firebase = require("firebase-admin");

//Keep track of all in progress matches
const matches = [];

const startMatch = async (io, matchId, docRef) => {
    // io.to(matchId).emit("start-match");
    await docRef.update({
        status: { 
            state: "starting", 
            data: { 
                count: 5 
            }
        }
    });


    const matchDoc = await docRef.get();
    const matchData = matchDoc.data();

    const matchObj = {
        matchId,
        player1: matchData.player1,
        player2: matchData.player2,
        player1Move: "none",
        player2Move: "none",
        player1Score: 0,
        player2Score: 0
    }
    matches.push(matchObj);

    console.log(`Starting match with id ${matchId}.`);

    // Match start countdown
    await countdown(5, docRef, matchObj, "status.data.count");

    // Main game loop
    while (matchObj.player1Score < 3 && matchObj.player2Score < 3) {
        await docRef.update({
            status: {
                state: "in-progress",
                data : {
                    count: 10
                }
            }
        });

        // Wait for players to make moves
        await countdown(10, docRef, matchObj, "status.data.count");

        // Abbreviate
        const p1m = matchObj.player1Move;
        const p2m = matchObj.player2Move;

        let winner = "none";

        // Player 1 scores a point
        if (p1m !== "none"
            && ((p1m === "rock" && p2m === "scissors")
                || (p1m === "paper" && p2m === "rock")
                || (p1m === "scissors" && p2m === "paper")
                || (p2m === "none")
                )
            ) {
            winner = "player1";
            matchObj.player1Score++;
            docRef.update({
                player1Score: firebase.firestore.FieldValue.increment(1)
            });
        // Player 2 scores a point
        } else if (p2m !== "none"
            && ((p2m === "rock" && p1m === "scissors")
                || (p2m === "paper" && p1m === "rock")
                || (p2m === "scissors" && p1m === "paper")
                || (p1m === "none")
                )
            ) {
            winner = "player2";
            matchObj.player2Score++;
            docRef.update({
                player2Score: firebase.firestore.FieldValue.increment(1)
            });
        // Tie
        } else if (p1m === p2m && p1m !== "none" && p2m !== "none") {
            winner = "tie";
        // Nobody responded - end game
        } else {
            console.log(`Ending match ${matchId}`);
            break;
        }
        
        matchObj.player1Move = "none";
        matchObj.player2Move = "none";

        await docRef.update({
            status: {
                state: "between-rounds",
                data : {
                    count: 3,
                    winner: winner !== "tie" ? matchObj[winner] : "tie"
                }
            }
        });
        await countdown(3, docRef, matchObj, "status.data.count");
    }

    await docRef.update({
        status: {
            state: "complete",
            data : {
                winner: matchObj.player1Score > matchObj.player2Score ? matchObj.player1 : matchObj.player1Score !== matchObj.player2Score ? matchObj.player2 : "Nobody"
            }
        }
    });
}

const countdown = (count, docRef, matchObj, propToUpdate) => {

    const timer = (count, docRef, matchObj, propToUpdate, resolve) => {
        if (count === 0 || (matchObj.player1Move !== "none" && matchObj.player2Move !== "none")) {
            resolve();
        } else {
            setTimeout(async () => {
                const docUpdate = {}
                docUpdate[propToUpdate] = count - 1;
                await docRef.update(docUpdate);
    
                timer(count - 1, docRef, matchObj, propToUpdate, resolve);
            }, 1000);
        }
    }

    return new Promise((resolve) => {
        timer(count, docRef, matchObj, propToUpdate, resolve);
    })
}

const sendMove = (user, matchId, move) => {
    const match = getMatch(matchId);
    const property = match.player1 === user.email ? "player1Move" : "player2Move";
    getMatch(matchId)[property] = move;
}

const getMatch = (matchId) => {
    for (let i = 0; i < matches.length; i++) {
        if (matches[i].matchId === matchId) {
            return matches[i];
        }
    }
}

module.exports = {
    startMatch,
    sendMove
};

