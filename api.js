import { jwtDecode } from "jwt-decode";
const API_URL = "https://retokodemiaapidev-to.onrender.com";

export async function login (email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    const json = await response.json();
    return json.data.token;
};

export async function getUserById (id) {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-type' : 'application/json'
        },
    });
    const json = await response.json();
    return json.data;
};

export async function createUser (name, profilePic, username, email, password) {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name,
            profilePic,
            username,
            email,
            password
        })
    });
    const json= await response.json();
    return json.data;
};

export async function createPost (title, image, body, tags) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const tagsArray = tags.split(',');
    const decodedToken = jwtDecode(token);

    if (!token) {
        throw new Error("No se encontró el token de autenticación");
    }

    const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            title:title,
            image:image,
            body:body,
            tags:tagsArray,
            user:decodedToken.id
        })
    });
};