import { API_URL } from "../constants";

function getUsers(query) {
    return fetch(`${API_URL}/api/users?${query}`)
        .then(resp => resp.json())
}

function getUserById(id) {
    return fetch(`${API_URL}/api/users/${id}`)
        .then(resp => resp.json())
}

function createUser(userdata) {
    return fetch(`${API_URL}/api/users`, {
        method: 'POST',
        body: JSON.stringify(userdata),
        headers: {"Content-Type": "application/json"}
    })
        .then(resp => resp.json())
}

function updateUser(user, id) {
    return fetch(`${API_URL}/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {"Content-Type": "application/json"}
    })
        .then(resp => resp.json())
}

export const userService = {
    getUsers,
    getUserById,
    updateUser,
    createUser
}