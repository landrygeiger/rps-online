
const ScoreBubble = (props) => {
    const filled = props.matchData[`player${props.player}Score`] >= props.number;
    const style = {
        backgroundColor: filled ? "#0275d8" : "white",
        border: filled ? "none" : "2px solid gray",
        borderRadius: "50%",
        width: props.small ? "15px" : "20px",
        height: props.small ? "15px" : "20px",
        margin: "0 5px"
    }

    return (
        <div style={style}></div>
    )
}

export default ScoreBubble;