import React, {useContext} from 'react';
import {Modal, ModalContent} from "@nextui-org/react";
import {AuthContext} from "../../Context/AuthProvider";
import {signOut} from "firebase/auth";
import {auth} from "../../Firebase/firebase";
import {useNavigate} from "react-router";

function MobileMenu() {
    const {
        openMobileMenu,
        setOpenMobileMenu,
        loginUser,
        openLoginModal,
        setOpenLoginModal,
        openRegisterModal,
        setOpenRegisterModal,
        goCategories
    } = useContext(AuthContext);
    const navigate = useNavigate()

    function logout() {
        signOut(auth).then(() => {
            // Sign-out successful.
            localStorage.removeItem('token'); // Tokenı localStorage'dan silin
            localStorage.removeItem('uid')
            setOpenMobileMenu(!openMobileMenu)
            navigate("/")
            // data.chat = "null"
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <Modal isOpen={openMobileMenu} placement="top" hideCloseButton={false}
               onOpenChange={() => setOpenMobileMenu(!openMobileMenu)}
               className="flex bg-gray-700 text-white flex-col gap-1">
            <ModalContent>
                <div className="dark:bg-gray-700 p-10 ">
                    <div className=" rounded-lg  flex w-full items-center justify-center flex-col gap-y-4 ">
                        <div className="w-full flex justify-around">
                            {loginUser ? <div className="flex flex-col gap-y-4">
                                    <p>Welcome {loginUser?.name}</p>
                                    <button onClick={logout} className="underline">Logout</button>
                                </div> :
                                <>
                                    <button onClick={() => setOpenLoginModal(!openLoginModal)}>Login</button>
                                    <button onClick={() => setOpenRegisterModal(!openRegisterModal)}>Register</button>
                                </>
                            }
                        </div>
                        <div className=" border-b w-full"></div>
                        <div className="flex flex-col gap-y-4">
                            <button
                                onClick={() => {
                                setOpenMobileMenu(!openMobileMenu);
                                goCategories("business")}}
                            >Business
                            </button>
                            <button  onClick={() => {
                                setOpenMobileMenu(!openMobileMenu);
                                goCategories("technology")}}>Technology</button>
                            <button  onClick={() => {
                                setOpenMobileMenu(!openMobileMenu);
                                goCategories("science")}}>Science</button>
                            <button  onClick={() => {
                                setOpenMobileMenu(!openMobileMenu);
                                goCategories("health")}}>Health</button>
                            <button  onClick={() => {
                                setOpenMobileMenu(!openMobileMenu);
                                goCategories("sports")}}>Sports</button>
                        </div>
                    </div>
                </div>
            </ModalContent>

        </Modal>
    );
}

export default MobileMenu;