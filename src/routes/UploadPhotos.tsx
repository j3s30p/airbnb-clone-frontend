import {
    Box,
    Button,
    Container,
    FormControl,
    Heading,
    Input,
    VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getUploadURL, uploadImage } from "../api";
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
    const { register, handleSubmit, watch } = useForm<IForm>();
    const uploadImageMutation = useMutation(uploadImage, {
        onSuccess: (data: any) => {
            console.log(data);
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
    const { roomPk } = useParams();
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
                            <Button type="submit" colorScheme={"red"} w="100%">
                                Upload Photos
                            </Button>
                        </VStack>
                    </Container>
                </Box>
            </HostOnlyPage>
        </ProtectedPage>
    );
}
