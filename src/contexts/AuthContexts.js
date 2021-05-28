import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

// Context for authentication of user
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []) 
    

    const value = {
        currentUser,
        signup
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}