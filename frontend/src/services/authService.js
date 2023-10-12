import { API_URL } from "../constants";

function userRegist(formData) {
    return fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
    })
        .then(resp => {
            if(!resp.ok) {
                return Promise.reject({
                    status: resp.status,
                    statusText: resp.statusText,
                    message: resp.status == 400 ? "Minden mezőt helyesen töltsön ki!" : "Már létezik ilyen email!"
                })
            }
            return resp
        })
        .then(resp => resp.json())
}

function userLogin(formData) {
    return fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
        credentials: "include"
    })
        .then(resp => {
            if(!resp.ok) {
                return Promise.reject({
                    status: resp.status,
                    statusText: resp.statusText,
                    message: "Nem megfelelő email vagy jelszó!"
                })
            }
            return resp
        })
        .then(resp => resp.json())
}

function userLogout() {
    return fetch(`${API_URL}/auth/logout`, {
        credentials: 'include'
    })
    .then(resp => resp.json())
}

export const authService = {
    userRegist,
    userLogin,
    userLogout
} 