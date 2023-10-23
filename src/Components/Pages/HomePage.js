import React, {useEffect} from 'react';
import Content from "../Layouts/Content";
import {app, database, getTokens} from "../../Firebase/firebase";
import {getFunctions, httpsCallable} from "firebase/functions";
function HomePage() {

    useEffect(() => {
    }, []);


    return (
        <div className="overflow-hidden">
            <Content/>
        </div>
    );
}

export default HomePage;