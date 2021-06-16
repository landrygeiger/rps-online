
const GameCompleteDisplay = (props) => {
    return <p style={{fontSize: "40px"}}>{props.matchStatus.data.winner} wins!</p>
}

export default GameCompleteDisplay;