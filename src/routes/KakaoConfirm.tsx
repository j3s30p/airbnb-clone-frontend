import { Heading, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLogIn } from "../api";

export default function KakaoConfirm() {
    const { search } = useLocation();
    const toast = useToast();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation(kakaoLogIn, {
        onSuccess: () => {
            toast({
                status: "success",
                title: "Welcome!",
                description: "로그인 되었습니다.",
                position: "bottom-right",
            });
            queryClient.refetchQueries([`me`]);
            navigate("/");
        },
    });
    const confirmLogin = async () => {
        const params = new URLSearchParams(search);
        const code = params.get("code");
        if (code) {
            mutation.mutate(code);
        }
    };
    useEffect(() => {
        confirmLogin();
    }, []);
    return (
        <VStack justifyContent={"center"} mt={40}>
            <Heading>로그인 중입니다.</Heading>
            <Text>페이지를 닫지 말아주세요.</Text>
            <Spinner mt={10} size={"lg"}></Spinner>
        </VStack>
    );
}
