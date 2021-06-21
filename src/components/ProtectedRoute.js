import { useState } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import GameDisplay from "./game/GameDisplay";

const ProtectedRoute = (props) => {
    const { currentUser } = useAuth();
    const [location, setLocation] = useState(useLocation());

    return <Route path={props.path} >
        { currentUser ? <GameDisplay /> : <Redirect to={{pathname: "/login", state: { redirect: location.pathname }}}/> }
    </Route>
}

export default ProtectedRoute;