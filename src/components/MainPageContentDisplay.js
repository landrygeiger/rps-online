import { Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import PlayerDashboard from "./dashboard/PlayerDashboard";

// Displays all of the "content" for the landing page
const MainPageContentDisplay = () => {
    const { currentUser } = useAuth();
    return (
        // If user is logged in, return GameDashboard, else return the main page content
        <div className="w-100 h-100">{ currentUser ? <PlayerDashboard uid={currentUser.uid} /> : <MainPageContent /> }</div>
        
    );
}

//Content on main page
const MainPageContent = () => {
    return (
        <Card className="shadow" style={{borderRadius: "15px", padding: "30px"}}>
            <Card.Body>
                <h2>Competitive RPS Action</h2>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <p style={{width: "100%", textAlign: "right"}}>An online Rock Paper Scissors Experience. Play with friends around the world and track your statistics.</p>
                </div>
            </Card.Body>
        </Card>
    );
}

export default MainPageContentDisplay;