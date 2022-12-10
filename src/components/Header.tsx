import {
    Avatar,
    Box,
    Button,
    HStack,
    IconButton,
    LightMode,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import { logOut } from "../api";
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
    const toast = useToast();
    const queryClient = useQueryClient();
    const onLogOut = async () => {
        const toastId = toast({
            title: "Log out ...",
            description: "로그아웃 중 입니다.",
            status: "loading",
            position: "bottom-right",
        });
        await logOut();
        queryClient.refetchQueries([`me`]);
        toast.update(toastId, {
            title: "Done!",
            description: "로그아웃 되었습니다.",
            status: "success",
            position: "bottom-right",
            isClosable: true,
        });
    };
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
                        <>
                            <Menu>
                                <MenuButton>
                                    <Avatar
                                        name={user?.name}
                                        src={user?.profile_photo}
                                        size={"md"}
                                    />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={onLogOut}>
                                        Log Out
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </>
                    )
                ) : null}
            </HStack>
            <LoginModal isOpen={isLogInOpen} onClose={onLogInClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </Stack>
    );
}
