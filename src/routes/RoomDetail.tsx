import {
    Avatar,
    Box,
    Button,
    Container,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    HStack,
    Image,
    Input,
    InputGroup,
    InputLeftAddon,
    Skeleton,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../calender.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { checkBooking, getRoom, getRoomReviews, roomBooking } from "../api";
import { IRoomDetail, IRoomReview } from "../types";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { formatDate } from "../lib/utils";
import useUser from "../lib/useUser";

export default function RoomDetail() {
    const { register, handleSubmit, reset, watch } = useForm();
    const { roomPk } = useParams();
    const { user } = useUser();
    const { isLoading, data } = useQuery<IRoomDetail>(
        [`rooms`, roomPk],
        getRoom
    );
    const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<
        IRoomReview[]
    >([`rooms`, roomPk, `reviews`], getRoomReviews);
    const [dates, setDates] = useState<Date[]>();
    const { data: checkBookingData, isLoading: isCheckingBooking } = useQuery(
        ["check", roomPk, dates],
        checkBooking,
        { enabled: dates !== undefined, cacheTime: 0 }
    );
    const toast = useToast();
    const mutation = useMutation(roomBooking, {
        onSuccess: () => {
            toast({
                status: "success",
                title: "Booking create",
                description: "예약이 완료되었습니다.",
                position: "bottom-right",
            });
            reset();
        },
    });
    const onSubmit = () => {
        if (!user) {
            toast({
                status: "error",
                title: "Please Log In",
                description: "로그인 해주세요",
                position: "bottom-right",
            });
        }
        if (roomPk && dates && user) {
            const [firstDate, secondDate] = dates;
            const checkIn = formatDate(firstDate);
            const checkOut = formatDate(secondDate);
            const guests = watch("guests");
            mutation.mutate({ checkIn, checkOut, roomPk, guests });
        }
        reset();
    };
    return (
        <Box
            mt={10}
            px={{
                base: 10,
                lg: 40,
            }}
        >
            <Helmet>
                <title>{data ? data.name : "loading..."}</title>
            </Helmet>
            <Skeleton
                height={"43px"}
                w={!isLoading ? "100%" : " 40%"}
                isLoaded={!isLoading}
            >
                <Heading>{data?.name}</Heading>
            </Skeleton>
            <Grid
                mt={10}
                rounded="xl"
                overflow={"hidden"}
                gap={3}
                height="60vh"
                templateRows={"1fr 1fr"}
                templateColumns={"repeat(4, 1fr)"}
            >
                {[0, 1, 2, 3, 4].map((index) => (
                    <GridItem
                        colSpan={index === 0 ? 2 : 1}
                        rowSpan={index === 0 ? 2 : 1}
                        overflow={"hidden"}
                        key={index}
                    >
                        <Skeleton isLoaded={!isLoading} h="100%" w={"100%"}>
                            {data?.photos && data.photos.length > 0 ? (
                                <Image
                                    objectFit={"cover"}
                                    w={"100%"}
                                    h={"100%"}
                                    src={data?.photos[index]?.file}
                                />
                            ) : null}
                        </Skeleton>
                    </GridItem>
                ))}
            </Grid>
            <Grid gap={60} templateColumns={"2fr 1fr"}>
                <Box>
                    <HStack mt={10} justifyContent={"space-between"}>
                        <VStack alignItems={"flex-start"}>
                            <Skeleton isLoaded={!isLoading} height="30px">
                                <Heading>
                                    House hoted by {data?.owner.name}
                                </Heading>
                            </Skeleton>
                            <Skeleton isLoaded={!isLoading}>
                                <HStack justifyContent={"flex-start"} w="100%">
                                    <Text>{data?.toilets} toilet</Text>
                                    <Text>•</Text>
                                    <Text>
                                        {data?.rooms} room
                                        {data?.rooms === 1 ? "" : "s"}
                                    </Text>
                                </HStack>
                            </Skeleton>
                        </VStack>
                        <Avatar
                            name={data?.owner.name}
                            size={"lg"}
                            src={data?.owner.profile_photo}
                        />
                    </HStack>
                    <Box mt={10}>
                        <Heading mb={5} fontSize={"2xl"}>
                            <Skeleton isLoaded={!isReviewsLoading}>
                                <HStack>
                                    <FaStar color="yellow.400" />{" "}
                                    <Text>{data?.rating}</Text>
                                    <Text>•</Text>
                                    <Text>
                                        {reviewsData?.length} review
                                        {reviewsData?.length === 1 ? "" : "s"}
                                    </Text>
                                </HStack>
                            </Skeleton>
                        </Heading>
                        <Container
                            mt={16}
                            maxW={"container.lg"}
                            marginX={"none"}
                        >
                            <Grid gap={10} templateColumns="1fr 1fr">
                                {reviewsData?.map((review, index) => (
                                    <VStack
                                        key={index}
                                        alignItems={"flex-start"}
                                    >
                                        <HStack>
                                            <Avatar
                                                name={review.user.name}
                                                src={review.user.profile_photo}
                                                size="md"
                                            />
                                            <VStack
                                                spacing={0}
                                                alignItems={"flex-start"}
                                            >
                                                <Heading fontSize={"md"}>
                                                    {review.user.username}
                                                </Heading>
                                                <HStack spacing={1}>
                                                    <FaStar size={"12px"} />
                                                    <Text>{review.rating}</Text>
                                                </HStack>
                                            </VStack>
                                        </HStack>
                                        <Text>{review.payload}</Text>
                                    </VStack>
                                ))}
                            </Grid>
                        </Container>
                    </Box>
                </Box>
                <Box paddingTop={10}>
                    <VStack
                        as={"form"}
                        onSubmit={handleSubmit(onSubmit)}
                        spacing={8}
                    >
                        <Calendar
                            goToRangeStartOnSelect
                            onChange={setDates}
                            minDate={new Date()}
                            maxDate={
                                new Date(
                                    Date.now() +
                                        60 * 60 * 24 * 7 * 4 * 12 * 1000
                                )
                            }
                            minDetail="month"
                            prev2Label={null}
                            next2Label={null}
                            selectRange
                        />
                        <FormControl>
                            <FormLabel>Guests</FormLabel>
                            <InputGroup>
                                <Input
                                    {...register("guests", {
                                        required: true,
                                    })}
                                    required
                                    type={"number"}
                                    min={1}
                                />
                            </InputGroup>
                            <FormHelperText>숙박 인원</FormHelperText>
                        </FormControl>
                        <Button
                            type="submit"
                            disabled={!checkBookingData?.ok}
                            isLoading={isCheckingBooking && dates !== undefined}
                            w={"100%"}
                            colorScheme={"red"}
                        >
                            Make Booking
                        </Button>
                        {!isCheckingBooking && !checkBookingData?.ok ? (
                            <Text color="red.500">이미 예약된 날짜입니다.</Text>
                        ) : null}
                    </VStack>
                </Box>
            </Grid>
        </Box>
    );
}
