import React, {createContext, useEffect, useCallback, useState, useContext} from 'react';
import {auth, database, app} from "../Firebase/firebase"

import {
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
    getDoc,
    startAfter,
    updateDoc,
    onSnapshot,
    deleteDoc,
    doc,
    setDoc
} from 'firebase/firestore';
import {useNavigate} from "react-router";
import {getFunctions, httpsCallable} from "firebase/functions";

export const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const functions = getFunctions(app);

    const navigate = useNavigate()
    const [myCategories, setMyCategories] = useState("business");
    const [news, setNews] = useState([]);
    const [user, setUser] = useState(null);
        const [openLoginModal, setOpenLoginModal] = useState(false);
        const [openRegisterModal, setOpenRegisterModal] = useState(false);
        const [termsOfService, setTermsOfService] = useState(false);
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const [lostPassword, setLostPassword] = useState(false);

    async function getNews(categories) {
        setNews([])

        let data = {
            category : categories
        }
        const requestBackEnd = await httpsCallable(functions, 'getNews')(data)
        setNews(requestBackEnd.data["data"].articles)
    }
    function generateRandomString() {
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';

        for (let i = 0; i < 12; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    }
    async function goNewsContent(newsData,categories) {
        const randomNumber = await generateRandomString()
        if (newsData === null)
        {
            navigate(`news/${categories}`,{state: {newsData}})
        }
        else
        {
            navigate(`news/${categories}/${randomNumber}`, {state: {newsData}})

        }
    }
    function goCategories(categories){
        let data = null
        setMyCategories(categories)
        goNewsContent(data,categories)
    }
    async function getUser(userID) {
            console.log("userID", userID)
        }
        useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged( (authUser) => {
                if (authUser) {
                    const userDocRef = doc(database, "users", authUser.uid);
                    onSnapshot(userDocRef, (doc) => {
                        setUser(doc.data())
                    });
                } else {
                    setUser(null);
                }
            });
            return () => {
                unsubscribe();
            };
        }, []);


        return (
            <AuthContext.Provider value={{
                loginUser: user,
                openLoginModal,
                setOpenLoginModal,
                openRegisterModal,
                setOpenRegisterModal,
                openMobileMenu, setOpenMobileMenu,
                setTermsOfService,news, setNews,
                termsOfService,goNewsContent,myCategories, setMyCategories,getNews,goCategories,lostPassword, setLostPassword
            }}>
                {children}
            </AuthContext.Provider>
        );
    }
;
export default AuthProvider;