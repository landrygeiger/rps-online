import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

// Context for authentication of user
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = async (email, username, password) => {
        const userCred = await auth.createUserWithEmailAndPassword(email, password);
        await db.collection("users").doc(userCred.user.uid).set({
            username,
            ranking: 1000,
            xp: 0,
            matchesPlayed: []
        })
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }

    const signout = () => {
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            if (user) {
                const userDoc = await db.collection("users").doc(user.uid).get();
                user.username = userDoc.data().username;
            }
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []) 
    

    const value = {
        currentUser,
        signup,
        login,
        signout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}