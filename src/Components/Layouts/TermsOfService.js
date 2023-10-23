import React, {useContext} from 'react';
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {AuthContext} from "../../Context/AuthProvider";

function TermsOfService() {

    const {openLoginModal, setOpenLoginModal,openRegisterModal, setOpenRegisterModal,termsOfService, setTermsOfService} = useContext(AuthContext);

    return (
        <Modal
            backdrop="opaque"
            isOpen={termsOfService}
            onOpenChange={()=>setTermsOfService(!termsOfService)}
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
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pulvinar risus non risus hendrerit venenatis.
                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pulvinar risus non risus hendrerit venenatis.
                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                        Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                        dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                        Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                        Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                        proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="foreground" variant="light" onPress={()=>setTermsOfService(!termsOfService)}>
                        Close
                    </Button>

                </ModalFooter>

            </ModalContent>
        </Modal>
    );
}

export default TermsOfService;