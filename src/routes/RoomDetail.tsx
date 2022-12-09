import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRoom } from "../api";

export default function RoomDetail() {
    const { roomPK } = useParams();
    const { isLoading, data } = useQuery([`room:${roomPK}`], getRoom);
    console.log(data);
    return <h1> {`${roomPK}`} </h1>;
}
