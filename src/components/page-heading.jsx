// Styling for PageHeading
const style = {
    padding: "30px",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "white"
}

// Main Heading Component
const PageHeading = () => {
    return (
        <div style={style}>
            <h1>Rock Paper Scissors Online</h1>
            <LoginButtons />
        </div>
    );
}

// Container for login and sign-up buttons
const LoginButtons = () => {
     return (
        <div style={{display: "flex", alignItems: "center"}}>
            <button className="btn btn-primary">Login</button>
            <button className="btn btn-outline-primary" style={{marginLeft: "15px"}}>Sign Up</button>
        </div>
     );
    
}

export default PageHeading;