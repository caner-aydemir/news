import React, {useContext, useState} from 'react';
import {database, app, auth} from "../../Firebase/firebase"
import {getFunctions, httpsCallable} from "firebase/functions";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

import {AuthContext} from "../../Context/AuthProvider";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    RadioGroup,
    Radio
} from "@nextui-org/react";
import TermsOfService from "./TermsOfService";
import Login from "./Login";
import {useNavigate} from "react-router";
import {doc, setDoc} from "firebase/firestore";
import {signInWithEmailAndPassword} from "@firebase/auth";

function Register() {
    const auth = getAuth();

    const functions = getFunctions(app);
    const {
        openLoginModal,
        setOpenLoginModal,
        openRegisterModal,
        setOpenRegisterModal,
        termsOfService,
        setTermsOfService, setOpenMobileMenu,
        openMobileMenu
    } = useContext(AuthContext);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [error, setError] = useState(null);
    const [click, setClick] = useState(false);
    const [wait, setWait] = useState(false);
    const [registerComplete, setRegisterComplete] = useState(false);
    const navigate = useNavigate()
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    ).then();

    async function SignUpUser() {
        if (name === null) {
            setError("Name cannot be left blank!")
        } else if (email === null) {

            setError("Email cannot be left blank!")

        } else if (password === null) {

            setError("Password cannot be left blank!")

        } else if (confirmPassword !== password) {

            setError("Passwords do not match!")
        } else if (click === false) {
            setError("Terms and conditions must be confirmed!")

        } else {
            setWait(true)
            let data = {
                name: name,
                email: email,
                password: password
            }
            const requestBackEnd = await httpsCallable(functions, 'signUp')(data)
            setWait(false)
            const result = requestBackEnd.data["success"]
            if (result === true) {
                signInWithEmailAndPassword(auth,
                    email,
                    password
                ).then(async user => {
                    if (user) {
                        const userToken = user.user;
                        userToken.getIdToken()
                            .then((idToken) => {
                                localStorage.setItem('token', idToken);
                            })
                            .catch((error) => {
                            });
                        localStorage.setItem('uid', user.user.uid);
                    }
                }).catch(error => {
                })
                setRegisterComplete(!registerComplete)
                await delay(1000);
                setOpenRegisterModal(!openRegisterModal)
                setOpenMobileMenu(!openMobileMenu)

                navigate("/", {replace: true})
            }
            if (result === false) {
                setError(requestBackEnd.data["error"])
            }
        }

    }

    function OpenLoginModal() {
        setOpenRegisterModal(!openRegisterModal)
        setOpenLoginModal(!openLoginModal)
    }

    return (
        <>
            <Modal isOpen={openRegisterModal} hideCloseButton={false}
                   onOpenChange={() => setOpenRegisterModal(!openRegisterModal)}
                   className=" overflow-hidden h-auto ">
                <ModalContent>
                    <section className="bg-gray-50 dark:bg-gray-700">
                        <div className="lg:py-0">

                            <div
                                className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-700 dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                        Create and account
                                    </h1>
                                    <div className="space-y-4 md:space-y-6">
                                        <div>
                                            <label htmlFor="name"
                                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name
                                                and Surname</label>
                                            <input type="name" name="name" id="name"
                                                   onChange={(event) => setName(event.target.value)}
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                   placeholder="Vincenzo Montella" required=""/>
                                        </div>
                                        <div>
                                            <label htmlFor="email"
                                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                                email</label>
                                            <input type="email" name="email" id="email"
                                                   onChange={(event) => setEmail(event.target.value)}
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                   placeholder="name@company.com" required=""/>
                                        </div>
                                        <div>
                                            <label htmlFor="password"
                                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                            <input type="password" name="password" id="password" placeholder="••••••••"
                                                   onChange={(event) => setPassword(event.target.value)}
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                   required=""/>
                                        </div>
                                        <div>
                                            <label htmlFor="confirm-password"
                                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                                                password</label>
                                            <input type="password" name="confirm-password" id="confirm-password"
                                                   placeholder="••••••••"
                                                   onChange={(event) => setConfirmPassword(event.target.value)}
                                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                   required=""/>

                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <button onClick={() => setClick(!click)}
                                                        className={`h-5 w-5 rounded-xl border border-black bg-white ${click && "border-2 bg-green-700 border-white"}`}>

                                                </button>
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="terms"
                                                       className="font-light text-gray-500 dark:text-gray-300">I accept
                                                    the <button onClick={() => setTermsOfService(!termsOfService)}
                                                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                                                href="#">Terms and Conditions</button></label>
                                            </div>
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
                                            <button onClick={SignUpUser}
                                                    className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                                                     dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${registerComplete && "hidden"}`}>Create
                                                an account
                                            </button>
                                        }
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            Already have an account? <button onClick={OpenLoginModal}
                                                                             className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login
                                            here</button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </ModalContent>
            </Modal>
            {openLoginModal && <Login/>}
            {termsOfService && <TermsOfService/>}

        </>


    );
}

export default Register;