import React, {useContext, useEffect} from 'react';
import {AuthContext} from "../../Context/AuthProvider";
import Login from "./Login";
import Register from "./Register";
import login from "./Login";
import {auth} from "../../Firebase/firebase";
import {signOut} from "firebase/auth";
import {useNavigate, useLocation} from "react-router";
import MobileMenu from "./MobileMenu";


function Header() {
    const mediaQuery = window.matchMedia('(max-width: 897px)')

    useEffect(() => {
        console.log("auth.currentUser.uid", auth.currentUser?.uid)
    }, [auth.currentUser]);
    const {
        openLoginModal,
        setOpenLoginModal,
        openRegisterModal,
        setOpenRegisterModal,myCategories, setMyCategories,
        loginUser, openMobileMenu, setOpenMobileMenu,goNewsContent,goCategories
    } = useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation()

    function logout() {
        signOut(auth).then(() => {
            // Sign-out successful.
            localStorage.removeItem('token'); // Tokenı localStorage'dan silin
            localStorage.removeItem('uid')
            navigate("/")
            // data.chat = "null"
        }).catch((error) => {
            // An error happened.
        });
    }

    function goHome() {
        if (location.pathname === "/") {
            window.location.reload()
        } else {
            navigate("/")
        }
    }

    return (
        <>
            <nav className="text-white px-4 lg:px-6 py-2.5 xs:w-screen bg-gray-800  ">
                <div className="flex  justify-around items-center mx-auto w-full ">

                    <button onClick={goHome} className="flex items-center ">
                        <span
                            className="self-center text-xl font-serif whitespace-nowrap dark:text-white">News</span>
                    </button>

                    <div onClick={()=>{setOpenMobileMenu(!openMobileMenu)}} className="flex items-center  lg:order-2 lg:hidden">
                        <button data-collapse-toggle="mobile-menu-2" type="button"
                                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-controls="mobile-menu-2" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                      clipRule="evenodd"></path>
                            </svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>


                   <div className=" items-center gap-x-10 justify-center w-full hidden lg:flex">
                       <button
                           onClick={()=>goCategories("business")}
                           className={` block py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg
                       :border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400
                        lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}>
                           Business
                       </button>
                       <button onClick={()=>goCategories("technology")} className="block py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg
                       :border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400
                        lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                           Technology
                       </button>

                       <button
                           onClick={()=>goCategories("science")}
                           className="block py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg
                       :border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400
                        lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                           Science
                       </button>
                       <button
                           onClick={()=>goCategories("health")}
                           className="block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg
                       :border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400
                        lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                           Health
                       </button>
                       <button
                           onClick={()=>goCategories("sports")}
                           className="block py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg
                       :border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400
                        lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                           Sports
                       </button>
                   </div>
                    <div className="hidden lg:flex  px-10 text-white">
                        {localStorage.getItem("token") === null ?
                            <div className="flex items-center lg:order-2">
                                <button onClick={() => setOpenLoginModal(!openLoginModal)}
                                        className="text-gray-800 text-white hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg
                                            text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                    Login
                                </button>
                                <button onClick={() => setOpenRegisterModal(!openRegisterModal)}
                                        className="text-gray-800 text-white hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                    Register
                                </button>
                            </div>
                            :
                            <div className="flex items-center lg:order-2">
                                <p
                                    className="text-gray-800 text-white hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">

                                Welcome {loginUser?.name}</p>
                                <button onClick={logout}
                                        className="text-gray-800 text-white hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                    Logout!
                                </button>
                            </div>

                        }
                    </div>

                </div>

            </nav>
                {mediaQuery.matches && openMobileMenu && <MobileMenu/> }
            {openLoginModal && <Login/>}
            {openRegisterModal && <Register/>}
        </>


    );
}

export default Header;