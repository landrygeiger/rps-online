import ScoreBubble from "./ScoreBubble";

const Scoreboard = (props) => {
    return (
        <>
            <div className="d-flex justify-content-between mb-2">
                <h2>{props.matchData.player1}</h2>
                <h2>{props.matchData.player2}</h2>
            </div>
            <div className="d-flex justify-content-between">
                <div className="d-flex">
                    <ScoreBubble number={1} player={1} matchData={props.matchData} />
                    <ScoreBubble number={2} player={1} matchData={props.matchData} />
                    <ScoreBubble number={3} player={1} matchData={props.matchData} />
                </div>
                <div className="d-flex">
                    <ScoreBubble number={1} player={2} matchData={props.matchData} />
                    <ScoreBubble number={2} player={2} matchData={props.matchData} />
                    <ScoreBubble number={3} player={2} matchData={props.matchData} />
                </div>
            </div>
        </>
    )
}

export default Scoreboard;