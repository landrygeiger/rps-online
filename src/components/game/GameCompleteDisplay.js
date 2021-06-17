
const GameCompleteDisplay = (props) => {
    return <p style={{fontSize: "40px", textAlign: "center"}}>{props.matchStatus.data.winner} wins!</p>
}

export default GameCompleteDisplay;