/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
   
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from './firebase.config';

export const AuthContext = createContext(null);
const auth = getAuth(app);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    const createUser = async (email, password) => {
        setLoading(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            return result;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const updateUserProfile = async (name) => {
        if (!auth.currentUser) return;
        return updateProfile(auth.currentUser, { displayName: name });
    };

    const signIn = async (email, password) => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            return result;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };


    const logOut = async () => {
        await signOut(auth);
        setUser(null);
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser?.email) {

                setUser(currentUser);
            }
            else {

                setUser(null);
            }
            setLoading(false);
        });

        return () => unSubscribe();
    }, []);

    const authInfo = {
        createUser,
        user,
        setUser,
        setLoading,
        loading,
        signIn,
        signInWithGoogle,
        updateUserProfile,
        logOut,
        
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};


