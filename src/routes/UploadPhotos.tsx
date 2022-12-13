import {
    Box,
    Button,
    Container,
    FormControl,
    Heading,
    Input,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { createPhoto, getUploadURL, uploadImage } from "../api";
import HostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";

interface IForm {
    file: FileList;
}

interface IUploadURLResponse {
    id: string;
    uploadURL: string;
}

export default function UploadPhotos() {
    const { register, handleSubmit, watch, reset } = useForm<IForm>();
    const { roomPk } = useParams();
    const toast = useToast();
    const createPhotoMutation = useMutation(createPhoto, {
        onSuccess: () => {
            toast({
                status: "success",
                title: "Image Uploaded",
                isClosable: true,
                description: "사진이 등록되었습니다.",
                position: "bottom-right",
            });
            reset();
        },
    });
    const uploadImageMutation = useMutation(uploadImage, {
        onSuccess: ({ result }: any) => {
            if (roomPk) {
                createPhotoMutation.mutate({
                    description: "came from FrontEnd",
                    file: `https://imagedelivery.net/xD-A4LCHZlKg4ggxm2RmHw/${result.id}/public`,
                    roomPk,
                });
            }
        },
    });
    const uploadURLMutation = useMutation(getUploadURL, {
        onSuccess: (data: IUploadURLResponse) => {
            uploadImageMutation.mutate({
                uploadURL: data.uploadURL,
                file: watch("file"),
            });
        },
    });
    const onSubmit = () => {
        uploadURLMutation.mutate();
    };
    return (
        <ProtectedPage>
            <HostOnlyPage>
                <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
                    <Container>
                        <Heading textAlign={"center"}>Upload a Photo</Heading>
                        <VStack
                            spacing={5}
                            mt={10}
                            as="form"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <FormControl>
                                <Input
                                    {...register("file")}
                                    type="file"
                                    accept="image/*"
                                />
                            </FormControl>
                            <Button
                                isLoading={
                                    createPhotoMutation.isLoading ||
                                    uploadImageMutation.isLoading ||
                                    uploadURLMutation.isLoading
                                }
                                type="submit"
                                colorScheme={"red"}
                                w="100%"
                            >
                                Upload Photos
                            </Button>
                        </VStack>
                    </Container>
                </Box>
            </HostOnlyPage>
        </ProtectedPage>
    );
}
