import MatchCard from "./MatchCard";

const PlayedMatchList = (props) => {
    return (
        <div className="d-flex flex-column align-items-center px-2 py-2" style={{height: "100%", overflowY: "auto", overflowX: "hidden", borderRadius: "15px"}}>
            { props.matchData.slice().reverse().map((match, index)=> <MatchCard matchData={match} username={props.username} key={`match${index}`}/>) }
        </div>
    )
}

export default PlayedMatchList