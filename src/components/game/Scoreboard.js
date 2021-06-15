
const Scoreboard = (props) => {
    return (
        <div className="d-flex justify-content-between">
            <h2>{props.matchData.player1}</h2>
            <h2>{props.matchData.player2}</h2>
        </div>
    )
}

export default Scoreboard;