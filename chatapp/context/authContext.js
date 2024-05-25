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
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        // state change
        const unSub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsAuthenticated(true);
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) setUser(userDoc.data());
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });

        return unSub;
    }, []);

    const register = async (email, password, username, profileURL) => {
        try {
            // add auth firebase
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
                username
            );

            if (response.user)
                // add store db
                await setDoc(doc(db, "users", response?.user?.uid), {
                    username,
                    profileURL,
                    userId: response?.user?.uid,
                });

            return { success: true, msg: "Welcome to my chat app 💕" };
        } catch (e) {
            let msg = e.message.includes("(auth/invalid-email)")
                ? "Invalid email"
                : e.message.includes("(auth/email-already-in-use)")
                ? "This email is already in use"
                : e.message;

            return { success: false, msg };
        }
    };

    const login = async (email, password) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, msg: "Login successfully" };
        } catch (e) {
            let msg = e.message.includes("(auth/invalid-email)")
                ? "Invalid email"
                : e.message.includes("(auth/invalid-credential)")
                ? "Email or password incorrect"
                : e.message;
            return { success: false, msg };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true, msg: "See u again..." };
            // handle
        } catch (error) {
            return { success: false, msg: error.message };
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, login, register, logout }}
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
