import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1",
    withCredentials: true,
});

export const getRooms = () =>
    instance.get("rooms/").then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
    const [_, roomPk] = queryKey;
    return instance.get(`rooms/${roomPk}`).then((response) => response.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
    const [_, roomPk] = queryKey;
    return instance
        .get(`rooms/${roomPk}/reviews`)
        .then((response) => response.data);
};

export const getMe = () =>
    instance.get(`users/me`).then((response) => response.data);

export const logOut = () =>
    instance
        .post(`users/log-out`, null, {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        })
        .then((response) => response.data);

export const githubLogIn = (code: string) =>
    instance
        .post(
            `/users/github`,
            { code },
            {
                headers: {
                    "X-CSRFToken": Cookie.get("csrftoken") || "",
                },
            }
        )
        .then((response) => response.status);

export const kakaoLogIn = (code: string) =>
    instance
        .post(
            `/users/kakao`,
            { code },
            {
                headers: {
                    "X-CSRFToken": Cookie.get("csrftoken") || "",
                },
            }
        )
        .then((response) => response.status);

export interface IUsernameLogInVariables {
    username: string;
    password: string;
}
export interface IUsernameLogInSuccess {
    ok: string;
}
export interface IUsernameLogInError {
    error: string;
}
export const usernameLogIn = ({
    username,
    password,
}: IUsernameLogInVariables) =>
    instance
        .post(
            `/users/log-in`,
            { username, password },
            {
                headers: {
                    "X-CSRFToken": Cookie.get("csrftoken") || "",
                },
            }
        )
        .then((response) => response.data);

export interface IUserSignUpVariables {
    name: string;
    username: string;
    password: string;
    email: string;
}
export const userSignUp = ({
    name,
    username,
    password,
    email,
}: IUserSignUpVariables) =>
    instance
        .post(
            `/users/`,
            { name, username, password, email },
            {
                headers: {
                    "X-CSRFToken": Cookie.get("csrftoken") || "",
                },
            }
        )
        .then((response) => response.data);
