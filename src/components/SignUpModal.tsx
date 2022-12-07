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
    VStack,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sign Up</ModalHeader>
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
                                        <FaEnvelope />
                                    </Box>
                                }
                            />
                            <Input
                                variant={"filled"}
                                placeholder="email"
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
                            Sign Up
                        </Button>
                    </LightMode>
                    <SocialLogin />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
