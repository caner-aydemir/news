import React, {useContext, useState} from 'react';
import {AuthContext} from "../../Context/AuthProvider";
import {Modal, ModalContent} from "@nextui-org/react";
import Register from "./Register";
import {useNavigate} from "react-router";
import { database, auth } from '../../Firebase/firebase';
import {signInWithEmailAndPassword} from "@firebase/auth";
import LostPasswordModal from "./LostPasswordModal";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {openLoginModal, setOpenLoginModal,openRegisterModal,setOpenRegisterModal,openMobileMenu, setOpenMobileMenu,lostPassword, setLostPassword} = useContext(AuthContext);
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const [wait, setWait] = useState(false);
    const [registerComplete, setRegisterComplete] = useState(false);


    async function signIn() {
        setWait(true)
        signInWithEmailAndPassword(auth,
            email,
            password
        ).then(async user => {
            setRegisterComplete(!registerComplete)
            if (user) {
                const userToken = user.user;
                userToken.getIdToken()
                    .then((idToken) => {
                        localStorage.setItem('token', idToken);
                    })
                    .catch((error) => {
                    });
                localStorage.setItem('uid', user.user.uid);
                setOpenLoginModal(!openLoginModal)
                setOpenMobileMenu(!openMobileMenu)
            }
        }).catch(error => {
            setWait(false)
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-login-credentials') {
                setError("Check your email or password.")

            } else if (errorCode === 'auth/invalid-email') {
                setError( "Please enter your email format correctly.")


            } else if (errorCode === 'auth/wrong-password') {
                setError("Check your email or password.")

            } else if (email === '' || password === '') {
                setError("Please do not leave your email or password blank. ")
            }
            else
            {
                setError(error.message)
            }
        })
    }
    function OpenRegisterModal()
    {
        setOpenLoginModal(!openLoginModal)
        setOpenRegisterModal(!openRegisterModal)
    }
    return (
        <>
            <Modal isOpen={openLoginModal} hideCloseButton={false} onOpenChange={()=>setOpenLoginModal(!openLoginModal)} className="  overflow-hidden h-auto ">
                <ModalContent>
                    <div className="dark:bg-gray-700 p-10 ">
                        <div className=" rounded-lg  relative ">
                            <div className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" >
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our
                                    platform</h3>
                                <div>
                                    <label htmlFor="email"
                                           className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your
                                        email</label>
                                    <input type="email" name="email" id="email"
                                           onChange={(event)=>setEmail(event.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                           placeholder="name@company.com" required=""/>
                                </div>
                                <div>
                                    <label htmlFor="password"
                                           className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your
                                        password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••"
                                           onChange={(event)=>setPassword(event.target.value)}

                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                           required=""/>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox"
                                                   className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4
                                                    w-4 rounded dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600
                                                    dark:ring-offset-gray-800"
                                                   required=""/>
                                        </div>
                                        <div className="text-sm ml-3">
                                            <label htmlFor="remember"
                                                   className="font-medium text-gray-900 dark:text-gray-300">Remember
                                                me</label>
                                        </div>
                                    </div>
                                    <button onClick={()=>setLostPassword(!lostPassword)}
                                       className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost
                                        Password?</button>
                                </div>
                                {registerComplete ?
                                    <p className="text-center text-xl text-green-600 font-bold animate-pulse">Successful</p> :
                                    <p className="text-center text-red-600 font-bold animate-pulse">{error}</p>}
                                {wait ? <button
                                        className="flex justify-center items-center w-full  bg-primary-600 py-2
                                                           rounded-lg ">
                                                <span
                                                    className="w-7 h-7 border-4 border-white border-dotted rounded-full
                                                     animate-[spin_1s_ease-in-out_infinite]  duration-700"/>

                                    </button>
                                    :
                                    <button onClick={signIn}
                                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                                        focus:ring-blue-300 font-medium rounded-lg
                                         text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                                         dark:focus:ring-blue-800">
                                        Login
                                        to your account
                                    </button>
                                }

                                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                    Not registered? <button onClick={OpenRegisterModal}
                                                            className="text-blue-700 hover:underline dark:text-blue-500">Create
                                    account</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </ModalContent>

            </Modal>
            {openRegisterModal && <Register/>}
            {lostPassword && <LostPasswordModal/>}
        </>


    );
}

export default Login;