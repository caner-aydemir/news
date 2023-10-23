import React, {useContext, useState} from 'react';
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {AuthContext} from "../../Context/AuthProvider";
import {auth} from "../../Firebase/firebase";
import {fetchSignInMethodsForEmail, sendPasswordResetEmail} from "@firebase/auth";
import {getAuth} from "firebase/auth";

function LostPasswordModal() {
    const {lostPassword, setLostPassword, setOpenLoginModal,openRegisterModal, setOpenRegisterModal,termsOfService, setTermsOfService} = useContext(AuthContext);
    const [confirmEmail, setConfirmEmail] = useState("");
    const [resetSent, setResetSent] = useState(null);
    const [error, setError] = useState("");

    function handleReset() {
        const delay = ms => new Promise(
            resolve => setTimeout(resolve, ms)
        ).then();
        if (confirmEmail !== "") {
           fetchSignInMethodsForEmail(auth,confirmEmail)
                .then(async (signInMethods) => {
                    if (signInMethods.length > 0) {
                        // Kullanıcı kayıtlıdır
                         sendPasswordResetEmail(auth,confirmEmail)
                            .then(async () => {
                                setResetSent(true);
                                await delay(1300)
                                window.location.reload()
                            })

                    } else {
                        setResetSent(false)
                        await delay(1000)
                        window.location.reload()
                    }
                }).catch((err)=>{
                    setError(err.message)
                console.log("err" , err.message)
            })
        } else
            return
    }
    return (
        <Modal
            backdrop="opaque"
            isOpen={lostPassword}
            onOpenChange={()=>setLostPassword(!lostPassword)}
            radius="2xl"
            classNames={{
                body: "py-6",
                backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                header: "border-b-[1px] border-[#292f46]",
                footer: "border-t-[1px] border-[#292f46]",
                closeButton: "hover:bg-white/5 active:bg-white/10",
            }}
        >
            <ModalContent>

                <ModalHeader className="flex flex-col gap-1">Terms and Conditions</ModalHeader>
                <ModalBody>
                    {resetSent === null &&
                        <div className="flex flex-col gap-y-2">
                            <p className="text-white font-bold">Enter
                                your e-mail address</p>
                            <input
                                onChange={(e) => setConfirmEmail(e.target.value)}
                                type="text"
                                className="border-2 border-gray-500 py-2 text-sm px-4 rounded-full"
                                placeholder="test@test.com"/>
                            <button onClick={handleReset}
                                    className=" text-sm py-1 px-2 border-2 bg-green-700 text-white font-bold flex justify-center rounded-full">Send
                                reset link
                            </button>

                        </div>}
                    {error !== "" && <p className="text-red-700 text-center font-semibold">{error}</p>}
                    {resetSent === true && <div
                        className="  text-green-600 font-bold">Password
                        reset link sent to "{confirmEmail}"</div>}
                    {resetSent === false && <div
                        className="text-red-700 font-bold">No account found for this e-mail  address.</div>}

                </ModalBody>
                <ModalFooter>
                    <Button color="foreground" variant="light" onPress={()=>setLostPassword(!lostPassword)}>
                        Close
                    </Button>

                </ModalFooter>

            </ModalContent>
        </Modal>
    );
}

export default LostPasswordModal;