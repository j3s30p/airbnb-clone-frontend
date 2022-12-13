import { Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../api";
import Room from "../components/Room/Room";
import RoomSkeleton from "../components/Room/RoomSkeleton";
import { IRoomList } from "../types";
import { Helmet } from "react-helmet";

export default function Home() {
    const { isLoading, data } = useQuery<IRoomList[]>(["rooms"], getRooms);
    return (
        <Grid
            mt={10}
            px={{
                base: 10,
                lg: 40,
            }}
            columnGap={4}
            rowGap={10}
            templateColumns={{
                sm: "1fr",
                md: "1fr 1fr",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
                "2xl": "repeat(5, 1fr)",
            }}
        >
            <Helmet>
                <title>Airbnb</title>
            </Helmet>
            {isLoading ? (
                <>
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                </>
            ) : null}
            {data?.map((room) => (
                <Room
                    key={room.pk}
                    pk={room.pk}
                    isOwner={room.is_owner}
                    imageUrl={room.photos[0]?.file}
                    address={room.address}
                    rating={room.rating}
                    city={room.city}
                    country={room.country}
                    price={room.price}
                />
            ))}
        </Grid>
    );
}
