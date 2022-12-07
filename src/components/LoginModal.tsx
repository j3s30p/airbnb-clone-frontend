import {
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    LightMode,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log In</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color={"gray.500"}>
                                        <FaUserAlt />
                                    </Box>
                                }
                            />
                            <Input
                                variant={"filled"}
                                placeholder="username"
                            ></Input>
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement
                                children={
                                    <Box color={"gray.500"}>
                                        <FaLock />
                                    </Box>
                                }
                            />
                            <Input
                                variant={"filled"}
                                placeholder="password"
                            ></Input>
                        </InputGroup>
                    </VStack>
                    <LightMode>
                        <Button colorScheme={"red"} w={"100%"} mt={4}>
                            Log In
                        </Button>
                    </LightMode>
                    <SocialLogin />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
