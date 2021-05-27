// Styling for content container
const style = {
    backgroundColor: "white",
    marginTop: "50px",
    marginBottom: "50px",
    padding: "50px",
    borderRadius: "15px",
    height: "80vh"
}

// Displays all of the "content" for the main page
const MainPageContent = () => {
    return (
        <div className="container" style={style}>
            <h2>Competitive Rock Paper Scissors Action</h2>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <button className="btn-lg">big ol button</button>
                <p style={{width: "70%", textAlign: "right"}}>filler text this is filler text i am filling up this space with text because i need it to look like there is actually something here please disregard what this actually says thank you.</p>
            </div>
        </div>
    );
}

export default MainPageContent;