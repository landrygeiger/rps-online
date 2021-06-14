//Keep track of all in progress matches
const matches = [];

const startMatch = (io, matchId, matchData) => {
    io.to(matchId).emit("start-match");
    matches.push({
        matchId,
        player1: matchData.player1,
        player2: matchData.player2,
        player1Move: "none",
        player2Move: "none",
    })
    console.log(`Starting match with id ${matchId}.`);
}

const sendMove = (user, matchId, move) => {
    const match = getMatch(matchId);
    const property = match.player1 === user.email ? "player1Move" : "player2Move";
    match[property] = move;
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

