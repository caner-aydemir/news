import React, {useContext, useEffect} from 'react';
import {auth} from "../../Firebase/firebase";
import {AuthContext} from "../../Context/AuthProvider";

function Hakkimizda() {
    const {loginUser} = useContext(AuthContext);

    useEffect(() => {


    }, [auth.currentUser]);
    return (
        <div>{loginUser?.name} <br/> {localStorage.getItem("token")}</div>
    );
}

export default Hakkimizda;