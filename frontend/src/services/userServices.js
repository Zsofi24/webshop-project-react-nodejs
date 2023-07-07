function userRegist(formData) {
    return fetch(`http://localhost:3031/api/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
    })
}

function userLogin(formData) {
    return fetch(`http://localhost:3031/api/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
        credentials: "include"
    })
}

export const userService = {
    userRegist,
    userLogin
} 