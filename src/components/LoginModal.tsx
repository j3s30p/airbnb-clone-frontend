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
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { usernameLogIn } from "../api";
import SocialLogin from "./SocialLogin";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}
interface IForm {
    username: string;
    password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IForm>();
    const toast = useToast();
    const queryClient = useQueryClient();
    const mutaition = useMutation(usernameLogIn, {
        onSuccess: (data) => {
            toast({
                status: "success",
                title: "Welcome!",
                description: "로그인 되었습니다.",
                position: "bottom-right",
            });
            onClose();
            reset();
            queryClient.refetchQueries(["me"]);
        },
    });
    const onSubmit = ({ username, password }: IForm) =>
        mutaition.mutate({ username, password });
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log In</ModalHeader>
                <ModalCloseButton />
                <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
                    <VStack>
                        <InputGroup size={"md"}>
                            <InputLeftElement
                                children={
                                    <Box color={"gray.500"}>
                                        <FaUserAlt />
                                    </Box>
                                }
                            />
                            <Input
                                isInvalid={Boolean(errors.username?.message)}
                                required
                                {...register("username", {
                                    required: "username을 작성해주세요.",
                                })}
                                variant={"filled"}
                                placeholder="username"
                            ></Input>
                        </InputGroup>
                        <InputGroup size={"md"}>
                            <InputLeftElement
                                children={
                                    <Box color={"gray.500"}>
                                        <FaLock />
                                    </Box>
                                }
                            />
                            <Input
                                isInvalid={Boolean(errors.password?.message)}
                                required
                                {...register("password", {
                                    required: "password를 작성해주세요.",
                                })}
                                type="password"
                                variant={"filled"}
                                placeholder="password"
                            ></Input>
                        </InputGroup>
                    </VStack>
                    {mutaition.isError ? (
                        <Text
                            color={"red.500"}
                            textAlign="center"
                            fontSize={"small"}
                        >
                            Username 또는 Password가 잘못 입력되었습니다.
                        </Text>
                    ) : null}
                    <LightMode>
                        <Button
                            isLoading={mutaition.isLoading}
                            type="submit"
                            colorScheme={"red"}
                            w={"100%"}
                            mt={4}
                        >
                            Log In
                        </Button>
                    </LightMode>
                    <SocialLogin />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
