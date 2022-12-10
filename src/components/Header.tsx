import {
    Avatar,
    Box,
    Button,
    HStack,
    IconButton,
    LightMode,
    Stack,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import useUser from "../lib/useUser";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
    const { userLoading, isLoggedIn, user } = useUser();
    const {
        isOpen: isLogInOpen,
        onClose: onLogInClose,
        onOpen: onLogInOpen,
    } = useDisclosure();
    const { toggleColorMode } = useColorMode();
    const {
        isOpen: isSignUpOpen,
        onClose: onSignUpClose,
        onOpen: onSignUpOpen,
    } = useDisclosure();
    const logoColor = useColorModeValue("red.500", "red.200");
    const SignUpIcon = useColorModeValue(FaMoon, FaSun);
    return (
        <Stack
            justifyContent={"space-between"}
            alignItems={"center"}
            py={5}
            px={40}
            direction={{
                sm: "column",
                md: "row",
            }}
            spacing={{
                sm: 4,
                md: 0,
            }}
            borderBottomWidth={1}
        >
            <Link to="/">
                <Box color={logoColor}>
                    <FaAirbnb size={"48"} />
                </Box>
            </Link>
            <HStack spacing={2}>
                <IconButton
                    onClick={toggleColorMode}
                    variant={"ghost"}
                    aria-label="Toggle dark mode"
                    icon={<SignUpIcon />}
                />
                {!userLoading ? (
                    !isLoggedIn ? (
                        <>
                            <Button onClick={onLogInOpen}>Sign In</Button>
                            <LightMode>
                                <Button
                                    onClick={onSignUpOpen}
                                    colorScheme={"red"}
                                >
                                    Sign UP
                                </Button>
                            </LightMode>
                        </>
                    ) : (
                        <Avatar size={"md"} />
                    )
                ) : null}
            </HStack>
            <LoginModal isOpen={isLogInOpen} onClose={onLogInClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </Stack>
    );
}
