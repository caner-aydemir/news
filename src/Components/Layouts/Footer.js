import React, {useContext} from 'react';
import appStore from "../Images/appStore.svg"
import googlePlay from "../Images/googlePlay.svg"
import {AuthContext} from "../../Context/AuthProvider";

function Footer() {
    const {
        openLoginModal,
        setOpenLoginModal,
        openRegisterModal,
        setOpenRegisterModal, myCategories, setMyCategories,
        loginUser, openMobileMenu, setOpenMobileMenu, goNewsContent, goCategories
    } = useContext(AuthContext);
    return (
        <div
            className="bottom-0 xs:flex-col  w-full bg-gray-700 flex justify-around items-center justify-center text-white  p-2">
            <p className=" font-serif text-3xl">News</p>
            <div className="flex gap-x-5">
                <button onClick={() => goCategories("business")} className="underline">Business</button>
                <button onClick={() => goCategories("technology")} className="underline">Technology</button>
                <button onClick={() => goCategories("science")} className="underline">Science</button>
                <button onClick={() => goCategories("health")} className="underline">Health</button>
                <button onClick={() => goCategories("sports")} className="underline">Sports</button>
            </div>
            <div className="flex flex-col items-center overflow-hidden">
                <img src={appStore} alt="" className="w-32 h-auto hover:cursor-pointer"/>
                <img src={googlePlay} alt="" className="w-32 h-auto hover:cursor-pointer"/>
            </div>
        </div>
    );
}

export default Footer;