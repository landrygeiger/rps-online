import { Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContexts";
import PlayerDashboard from "./PlayerDashboard";

// Displays all of the "content" for the landing page
const MainPageContentDisplay = () => {
    const { currentUser } = useAuth();
    return (
        // If user is logged in, return GameDashboard, else return the main page content
        <div className="w-100 h-100">{ currentUser ? <PlayerDashboard /> : <MainPageContent /> }</div>
        
    );
}

//Content on main page
const MainPageContent = () => {
    return (
        <Card className="shadow" style={{borderRadius: "15px", padding: "30px"}}>
            <Card.Body>
                <h2>Competitive RPS Action</h2>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <p style={{width: "100%", textAlign: "right"}}>filler text this is filler text i am filling up this space with text because i need it to look like there is actually something here please disregard what this actually says thank you.</p>
                </div>
            </Card.Body>
        </Card>
    );
}

export default MainPageContentDisplay;