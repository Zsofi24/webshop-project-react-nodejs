import { API_URL } from "../constants";

function userRegist(formData) {
    return fetch(`${API_URL}/api/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
    })
}

function userLogin(formData) {
    return fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
        credentials: "include"
    })
}

function userLogout() {
    return fetch(`${API_URL}/api/logout`, {
        credentials: 'include'
    })
    .then(resp => resp.json())
}

export const userService = {
    userRegist,
    userLogin,
    userLogout
} 