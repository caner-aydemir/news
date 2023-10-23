import { initializeApp } from "firebase/app";
import { getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getMessaging, getToken} from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDzY351iqL8NG-UqY55BvTD4dyi5elhero",
    authDomain: "news-cloud-functions.firebaseapp.com",
    projectId: "news-cloud-functions",
    storageBucket: "news-cloud-functions.appspot.com",
    messagingSenderId: "1055225442310",
    appId: "1:1055225442310:web:0dc2818904bc4e2afd1387"
};
const publicKey = "BMp_yVvD6XxqRxWgB2N0hk65PqZS6YVMjjY_Oovy9m6E-IwvRgrWJYnrk3C2NgszWeCvdtcxdtSWwmAlnWOku-Q";

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app)
const messaging = getMessaging(app);

export const getTokens = async () => {
    let currentToken = null;
    try {
        currentToken = await getToken(messaging,{vapidKey : publicKey})
    } catch (error) {
    }
    return currentToken;

};
export {auth , database,app}