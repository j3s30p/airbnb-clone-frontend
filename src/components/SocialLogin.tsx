import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
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
                    href="http://github.com/login/oauth/authorize?client_id=cc2132e9a21bafb6fd17&scope=read:user,user:email"
                    leftIcon={<FaGithub />}
                    w={"100%"}
                >
                    Continue with Github
                </Button>
                <Button
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
