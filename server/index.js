// Initialize Firebase admin app for server
const admin = require("firebase-admin");
const serviceAccount = require("./rock-paper-scissors-onli-dc6c4-firebase-adminsdk-4s6ib-bad26d3578.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// Create server socket
const io = require("socket.io")(3030, {
    cors: {
        origin: ["http://localhost:3000"]
    }
});

const { startMatch, sendMove } = require("./game");

// On client connection
io.on("connection", socket => {
    console.log(`User ${socket.id} connected.`);

    // Handle new match requests
    socket.on("create-match", callback => {
        // Create a new document in database
        const docRef = db.collection("active-matches").doc();
        docRef.set({
            status: "waiting-for-players",
            player1: "Waiting...",
            player2: "Waiting...",
            player1Score: 0,
            player2Score: 0
        })
        .then(() => {
            docRef.get().then(doc => {
                callback(doc.id);
            })
        });
    });

    // Client attempts to join a match
    socket.on("join-match", (user, matchId, admitUser) => {
        // Get match document in datebase
        const docRef = db.collection("active-matches").doc(matchId);
        docRef.get().then(doc => {
            if (doc.exists) {
                const matchData = doc.data();


                // Admit player 1
                if (matchData.player1 === "Waiting..." || matchData.player1 === user.email) {
                    docRef.update({ player1: user.email }).then(() => {
                        console.log(`User ${socket.id} (${user.email}) admitted into match ${matchId} as player 1.`);
                        socket.join(matchId)
                        admitUser(true);
                    });

                // Admit player 2
                } else if (matchData.player2 === "Waiting..." || matchData.player2 === user.email) {
                    docRef.update({ player2: user.email }).then(() => {
                        console.log(`User ${socket.id} (${user.email}) admitted into match ${matchId} as player 2.`);
                        
                        // Start match if both players have joined
                        if (matchData.status === "waiting-for-players") {
                            docRef.update({ status: "in-progress"}).then(() => {
                                docRef.get().then((freshDoc) => {
                                    startMatch(io, matchId, freshDoc.data());
                                })
                            });
                        }

                        socket.join(matchId);
                        admitUser(true);
                    });
                } else {
                    admitUser(false);
                    console.log(`User ${socket.id} (${user.email}) attempted to enter full match with id ${matchId}.`);
                }
            } else {
                console.log(`User ${socket.id} (${user.email}) attempted to enter unknown match with id ${matchId}.`)
                admitUser(false);
            }
        })
    });

    socket.on("send-move", (user, matchId, move) => {
        sendMove(matchId, move);
    })
});