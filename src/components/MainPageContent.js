import { Card } from "react-bootstrap";

// Displays all of the "content" for the landing page
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

export default MainPageContent;