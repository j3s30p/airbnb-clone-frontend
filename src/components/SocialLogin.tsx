import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
    const githubParameters = {
        client_id: "cc2132e9a21bafb6fd17",
        scope: "read:user,user:email",
    };
    const kakaoParameters = {
        client_id: "33e28ad5a56cd584ae2684da919e9657",
        redirect_uri: "http://127.0.0.1:3000/social/kakao",
        response_type: "code",
    };
    const githubParams = new URLSearchParams(githubParameters).toString();
    const kakaoParams = new URLSearchParams(kakaoParameters).toString();
    return (
        <Box mb={4}>
            <HStack my={8}>
                <Divider />
                <Text
                    textTransform={"uppercase"}
                    fontSize={"xs"}
                    color={"gray.500"}
                    as="b"
                >
                    Or
                </Text>
                <Divider />
            </HStack>
            <VStack>
                <Button
                    as="a"
                    href={`http://github.com/login/oauth/authorize?${githubParams}`}
                    leftIcon={<FaGithub />}
                    w={"100%"}
                >
                    Continue with Github
                </Button>
                <Button
                    as="a"
                    href={`https://kauth.kakao.com/oauth/authorize?${kakaoParams}`}
                    leftIcon={<FaComment />}
                    colorScheme={"yellow"}
                    w={"100%"}
                >
                    Continue with Kakao
                </Button>
            </VStack>
        </Box>
    );
}
