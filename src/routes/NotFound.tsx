import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function NotFound() {
    return (
        <VStack bg="gray.100" justifyContent={"center"} minH={"100vh"}>
            <Helmet>
                <title>404 NOT FOUND</title>
            </Helmet>
            <Heading>Page not found.</Heading>
            <Text>잘못된 URL 입니다.</Text>
            <Link to="/">
                <Button colorScheme={"red"} variant={"link"}>
                    Go home &rarr;
                </Button>
            </Link>
        </VStack>
    );
}
