import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const WLPieChart = (props) => {
    const { currentUser } = useAuth();
    const [wLPercent, setWLPercent] = useState(0);

    useEffect(() => {
        let wins = 0;
        props.matchData.forEach(match => {
            if (match.status.data.winner === currentUser.username) {
                wins++;
            }
        });
        setWLPercent(wins / props.matchData.length);
    }, [props.matchData])

    return (
        <div className="pie-chart-container shadow">
            <div className="pie-chart" style={{background: props.matchData.length > 0 ? `conic-gradient( #9aff63 ${180 * wLPercent}deg,  #ff745c 0 180deg,  white 0)` : "white"}}>
                <div className="pie-chart-cover">
                    <p style={{fontSize: "30px"}} className="mt-5">{props.matchData.length > 0 ? wLPercent.toFixed(2) : "0.00"}</p>
                    <p className="mt-0 text-muted">WLR</p>
                </div>
            </div>
        </div>
    )
}

export default WLPieChart