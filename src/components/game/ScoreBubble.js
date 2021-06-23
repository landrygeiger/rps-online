
const ScoreBubble = (props) => {
    const filled = props.matchData[`player${props.player}Score`] >= props.number;
    const style = {

        border: filled ? "2px solid #0275d8" : "2px solid rgb(196, 196, 196)",
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