import {
    Box,
    Button,
    Grid,
    HStack,
    Image,
    Text,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

interface IRoomProps {
    imageUrl: string;
    address: string;
    rating: number;
    city: string;
    country: string;
    price: number;
}

export default function Room({
    imageUrl,
    address,
    rating,
    city,
    country,
    price,
}: IRoomProps) {
    const roomFontColor = useColorModeValue("gray.600", "gray.300");
    return (
        <VStack spacing={-0.5} alignItems={"flex-start"}>
            <Box position="relative" overflow={"hidden"} mb={5} rounded={"2xl"}>
                <Image
                    maxW="280"
                    minW="280"
                    maxH="280"
                    minH="280"
                    src={imageUrl}
                />
                <Button
                    _hover={{
                        color: "red.400",
                    }}
                    variant={"unstyled"}
                    position="absolute"
                    top={0}
                    right={0}
                    color="white"
                >
                    <FaRegHeart size="20px" />
                </Button>
            </Box>
            <Box>
                <Grid gap={2} templateColumns={"6fr 1fr"}>
                    <Text as="b" noOfLines={1} fontSize="md">
                        {address}
                    </Text>
                    <HStack
                        _hover={{
                            color: "yellow.400",
                        }}
                        spacing={1}
                        color={"gray"}
                    >
                        <FaStar size="15px" />
                        <Text>{rating}</Text>
                    </HStack>
                </Grid>
                <Text fontSize="sm" color={roomFontColor}>
                    {city}, {country}
                </Text>
                <Text fontSize="sm" color={roomFontColor}>
                    <Text as="b">￦{price}</Text> / 박
                </Text>
            </Box>
        </VStack>
    );
}
