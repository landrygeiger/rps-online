import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ ...props }) => {
    const { currentUser } = useAuth();

    return !currentUser
        ? <Redirect to="/login" />
        : <Route {...props} />;
}

export default ProtectedRoute;