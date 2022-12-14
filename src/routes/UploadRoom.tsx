import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    Select,
    Text,
    Textarea,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaBed, FaMoneyBill, FaToilet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
    getAmenities,
    getCategories,
    IUploadRoomVariables,
    uploadRoom,
} from "../api";
import HostOnlyPage from "../components/Protect/HostOnlyPage";
import ProtectedPage from "../components/Protect/ProtectedPage";
import { IAmenity, ICategory, IRoomDetail } from "../types";
import { Helmet } from "react-helmet";

export default function UploadRoom() {
    const { register, handleSubmit } = useForm<IUploadRoomVariables>();
    const toast = useToast();
    const navigate = useNavigate();
    const mutation = useMutation(uploadRoom, {
        onSuccess: (data: IRoomDetail) => {
            toast({
                status: "success",
                title: "Room Created",
                description: "방이 등록되었습니다.",
                position: "bottom-right",
            });
            navigate(`/rooms/${data.id}`);
        },
    });
    const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<
        IAmenity[]
    >(["amenities"], getAmenities);
    const { data: categories, isLoading: isCategoriesLoading } = useQuery<
        ICategory[]
    >(["categories"], getCategories);
    const onSubmit = (data: IUploadRoomVariables) => {
        mutation.mutate(data);
    };
    return (
        <ProtectedPage>
            <HostOnlyPage>
                <Helmet>
                    <title>Room Upload</title>
                </Helmet>
                <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
                    <Container>
                        <Heading textAlign={"center"}>Upload Room</Heading>
                        <VStack
                            spacing={10}
                            as="form"
                            mt={5}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    {...register("name", { required: true })}
                                    required
                                    type={"text"}
                                />
                                <FormHelperText>
                                    방의 이름을 작성해주세요.
                                </FormHelperText>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Country</FormLabel>
                                <Input
                                    {...register("country", { required: true })}
                                    required
                                    type={"text"}
                                />
                                <FormHelperText>
                                    방이 위치한 나라를 작성해주세요.
                                </FormHelperText>
                            </FormControl>
                            <FormControl>
                                <FormLabel>City</FormLabel>
                                <Input
                                    {...register("city", { required: true })}
                                    required
                                    type={"text"}
                                />
                                <FormHelperText>
                                    방이 위치한 도시를 작성해주세요.
                                </FormHelperText>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Address</FormLabel>
                                <Input
                                    {...register("address", { required: true })}
                                    required
                                    type={"text"}
                                />
                                <FormHelperText>
                                    방이 위치한 위치를 작성해주세요.
                                </FormHelperText>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Price</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon
                                        children={<FaMoneyBill />}
                                    />
                                    <Input
                                        {...register("price", {
                                            required: true,
                                        })}
                                        required
                                        type={"number"}
                                        min={0}
                                    />
                                </InputGroup>
                                <FormHelperText>
                                    {"방의 가격을 작성해주세요 ( ₩ )"}
                                </FormHelperText>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Rooms</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon children={<FaBed />} />
                                    <Input
                                        {...register("rooms", {
                                            required: true,
                                        })}
                                        required
                                        type={"number"}
                                        min={1}
                                    />
                                </InputGroup>
                                <FormHelperText>
                                    방의 개수를 작성해주세요
                                </FormHelperText>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Toilets</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon children={<FaToilet />} />
                                    <Input
                                        {...register("toilets", {
                                            required: true,
                                        })}
                                        required
                                        type={"number"}
                                        min={0}
                                    />
                                </InputGroup>
                                <FormHelperText>
                                    화장실의 개수를 작성해주세요
                                </FormHelperText>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Textarea {...register("description")} />
                                <FormHelperText>
                                    방에 대한 설명을 작성해주세요
                                </FormHelperText>
                            </FormControl>
                            <FormControl>
                                <Checkbox
                                    {...register("pet_friendly", {
                                        required: true,
                                    })}
                                >
                                    Pet Friendly?
                                </Checkbox>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Kind of Room</FormLabel>
                                <Select
                                    {...register("kind", { required: true })}
                                    placeholder="종류를 골라주세요"
                                >
                                    <option value={"entire_place"}>
                                        Entire Place
                                    </option>
                                    <option value={"private_room"}>
                                        Private Room
                                    </option>
                                    <option value={"shared_room"}>
                                        Shared Room
                                    </option>
                                </Select>
                                <FormHelperText>
                                    어떠한 종류의 방을 빌려주시나요?
                                </FormHelperText>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Category of Room</FormLabel>
                                <Select
                                    {...register("category", {
                                        required: true,
                                    })}
                                    placeholder="카테고리를 골라주세요"
                                >
                                    {categories?.map((category) => (
                                        <option
                                            key={category.pk}
                                            value={category.pk}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </Select>
                                <FormHelperText>
                                    어떠한 카테고리의 방을 빌려주시나요?
                                </FormHelperText>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Amenity of Room</FormLabel>
                                <FormHelperText>
                                    방은 어떤것들을 제공하나요?
                                </FormHelperText>
                                <Grid
                                    mt={5}
                                    templateColumns={"1fr 1fr"}
                                    gap={5}
                                >
                                    {amenities?.map((amenity) => (
                                        <Box key={amenity.pk}>
                                            <Checkbox
                                                value={amenity.pk}
                                                {...register("amenities", {
                                                    required: true,
                                                })}
                                            >
                                                {amenity.name}
                                            </Checkbox>
                                            <FormHelperText>
                                                {amenity.description}
                                            </FormHelperText>
                                        </Box>
                                    ))}
                                </Grid>
                            </FormControl>
                            {mutation.isError ? (
                                <Text color={"red.500"}>Wrong</Text>
                            ) : null}
                            <Button
                                type="submit"
                                isLoading={mutation.isLoading}
                                colorScheme={"red"}
                                size="lg"
                                w={"100%"}
                            >
                                Upload Room
                            </Button>
                        </VStack>
                    </Container>
                </Box>
            </HostOnlyPage>
        </ProtectedPage>
    );
}
