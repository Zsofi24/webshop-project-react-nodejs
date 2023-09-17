import { API_URL } from "../constants";

function getCart() {
    return fetch(`${API_URL}/api/cart`, {
        credentials: 'include'
    })
    .then(resp => resp.json())
}

export const cartService = {
    getCart
}