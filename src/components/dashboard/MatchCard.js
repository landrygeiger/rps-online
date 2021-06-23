import { Col, Row } from "react-bootstrap";
import ScoreBubble from "../game/ScoreBubble";
import { Link } from "react-router-dom";

const MatchCard = (props) => {
    return (
        <div className="shadow mb-4 mx-4 w-100" style={{borderRadius: "20px", position: "relative", maxWidth: "625px"}}>

                <div className="px-3 d-flex flex-column justify-content-center" style={{backgroundColor: "white", height: "100px", borderRadius: "20px"}}>
                    <Row>
                        
                        <Col className="d-flex flex-column">
                            <Link to={`/user/${props.matchData.player1Id}`} style={{textDecoration: "none", color: "black"}}>
                                <p className="mb-1">{props.matchData.player1}</p>
                            </Link>
                            <div className="d-flex">
                                <ScoreBubble number={1} player={1} matchData={props.matchData} small />
                                <ScoreBubble number={2} player={1} matchData={props.matchData} small />
                                <ScoreBubble number={3} player={1} matchData={props.matchData} small />
                            </div>
                        </Col>
                        <Col xs="auto" className="d-flex justify-content-center align-items-center">
                            { props.matchData.status.data.winner === props.username &&
                                <i style={{fontSize: "20px", textAlign: "center"}} className="fas fa-trophy yellow" /> }
                        </Col>
                        <Col className="d-flex flex-column">
                            <Link to={`/user/${props.matchData.player2Id}`} style={{textDecoration: "none", color: "black"}}>
                                <p className="mb-1" style={{textAlign: "right", }}>{props.matchData.player2}</p>
                            </Link>
                            <div className="d-flex justify-content-end">
                                <ScoreBubble number={1} player={2} matchData={props.matchData} small />
                                <ScoreBubble number={2} player={2} matchData={props.matchData} small />
                                <ScoreBubble number={3} player={2} matchData={props.matchData} small />
                            </div>
                        </Col>
                    </Row>
                </div>
            { /*<div className="h-100 w-100" style={{border: "1px solid #dedede", backgroundColor: props.matchData.status.data.winner === currentUser.username ? "#72d13f" : "#d44e37", borderRadius: "15px", position: "absolute", top: "0", left: "0"}}></div>
            <Row className=" mx-3 px-4 py-3" style={{zIndex: 999, position: "relative", backgroundColor: "white"}}>
                <div className="d-flex justify-content-between">
                    <p>{props.matchData.player1}</p>
                    <p>{props.matchData.player2}</p>
                </div>
                <Row className="d-flex justify-content-between">
                    <Col className="d-flex">
                        <ScoreBubble number={1} player={1} matchData={props.matchData} small />
                        <ScoreBubble number={2} player={1} matchData={props.matchData} small />
                        <ScoreBubble number={3} player={1} matchData={props.matchData} small />
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <ScoreBubble number={1} player={2} matchData={props.matchData} small />
                        <ScoreBubble number={2} player={2} matchData={props.matchData} small />
                        <ScoreBubble number={3} player={2} matchData={props.matchData} small />
                    </Col>
                </Row>
            </Row> */ }
        </div>
    )
}

export default MatchCard;