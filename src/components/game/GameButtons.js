
const GameButtons = (props) => {

    const handleClick = e => {
        console.log(e.target.id);
        props.socket.emit("send-move", props.currentUser, props.gameId, e.target.id);
        // document.getElementById(e.target.id).style.backgroundColor = "#0275d8";
    } 

    return (
        <>
            <button className="game-button" id="rock" disabled={props.disabled} onClick={handleClick}><i className="far fa-hand-rock" /></button>
            <button className="game-button" id="paper" disabled={props.disabled} onClick={handleClick}><i className="far fa-hand-paper" /></button>
            <button className="game-button" id="scissors" disabled={props.disabled} onClick={handleClick}><i className="far fa-hand-scissors" /></button>
        </>
    )
}

export default GameButtons;