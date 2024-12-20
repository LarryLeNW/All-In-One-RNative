import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // state change
        // const unSub = onAuthStateChanged(auth, async (user) => {
        //     if (user) {
        //         setIsAuthenticated(true);
        //         const userDoc = await getDoc(doc(db, "users", user.uid));
        //         if (userDoc.exists()) setUser(userDoc.data());
        //     } else {
        //         setIsAuthenticated(false);
        //         setUser(null);
        //     }
        // });
        // return unSub;
    }, []);

    const register = async (email, password, username, profileURL) => {};

    const changeLoginData = async (data) => {
        setUser(data);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        // try {
        //     await signOut(auth);
        //     return { success: true, msg: "See u again..." };
        //     // handle
        // } catch (error) {
        //     return { success: false, msg: error.message };
        // }
    };

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, changeLoginData, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value)
        throw new Error("useAuth must be wrapped inside AuthContextProvider");

    return value;
};
