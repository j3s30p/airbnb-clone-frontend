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
import React from "react";
import { FaCamera, FaRegHeart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

interface IRoomProps {
    pk: number;
    imageUrl: string;
    address: string;
    rating: number;
    city: string;
    country: string;
    price: number;
    isOwner: boolean;
}

export default function Room({
    pk,
    imageUrl,
    address,
    rating,
    city,
    country,
    price,
    isOwner,
}: IRoomProps) {
    const roomFontColor = useColorModeValue("gray.600", "gray.300");
    const navigate = useNavigate();
    const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate(`/rooms/${pk}/photos`);
    };

    return (
        <Link to={`/rooms/${pk}`}>
            <VStack spacing={-0.5} alignItems={"flex-start"}>
                <Box
                    position="relative"
                    overflow={"hidden"}
                    mb={5}
                    rounded={"2xl"}
                >
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
                        onClick={onCameraClick}
                    >
                        {isOwner ? (
                            <FaCamera size="20px" />
                        ) : (
                            <FaRegHeart size="20px" />
                        )}
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
        </Link>
    );
}
