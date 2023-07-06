function userRegist(formData) {
    return fetch(`http://localhost:3031/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
    })
}

function userLogin(formData) {
    return fetch(`http://localhost:3031/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
    })
}

export const userService = {
    userRegist,
    userLogin
} 