import { useEffect, useState } from "react";

const GameButtons = (props) => {
    const [colored, setColored] = useState({buttonId: "none", shade: "#696969"});
    const [selected, setSelected] = useState("none");

    useEffect(() => {
        const status = props.matchStatus;

        if (status.state === "between-rounds") {
            setColored({
                buttonId: selected,
                shade: status.data.winner === props.currentUser.username ? "green" : status.data.winner === "tie" ? "yellow" : "red"
            })
        } else if (status.state === "in-progress") {
            setColored({
                buttonId: selected,
                shade: "#0275d8"
            })
        }
    }, [selected, props.matchStatus]);

    useEffect(() => {
        if (props.matchStatus.state === "in-progress") {
            props.disableButtons(false);
            setSelected("none")
        }
    }, [props.matchStatus.state])

    const handleClick = (move) => {
        props.socket.emit("send-move", props.currentUser.username, props.gameId, move);
        props.disableButtons(true);
        setSelected(move);
    }

    return (
        <div className="game-buttons">
            <Button disabled={props.disabled} handleClick={handleClick} buttonId={"rock"} colored={colored} />
            <Button disabled={props.disabled} handleClick={handleClick} buttonId={"paper"} colored={colored} />
            <Button disabled={props.disabled} handleClick={handleClick} buttonId={"scissors"} colored={colored} />
        </div>
    )
}

const Button = (props) => {
    const bgStyle = {
        backgroundColor: props.colored.buttonId === props.buttonId ? props.colored.shade : "#696969"
    }

    return (
        <button className="game-button" style={bgStyle} id={props.buttonId} disabled={props.disabled} onClick={() => props.handleClick(props.buttonId)}><i className={`far fa-hand-${props.buttonId}`} /></button>
    )
}

export default GameButtons;