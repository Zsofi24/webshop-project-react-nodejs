import { API_URL } from "../constants";

function getCart() {
    return fetch(`${API_URL}/api/cart`, {
        credentials: 'include'
    })
    .then(resp => resp.json())
}

function updateCartItem(userid, productid, amount) {
    return fetch(`${API_URL}/api/cart/${userid}/${productid}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({amount})
    })
        .then(resp => resp.json())
}

function deleteCartItem(userid, productid) {
    return fetch(`${API_URL}/api/cart/${userid}/${productid}`, {
        method: 'DELETE'
    })
        .then(resp => resp.json())
}

function getCartTotal() {
    return fetch(`${API_URL}/api/cart/total`, {
        credentials: 'include'
    })
    .then(resp => resp.json())
}

export const cartService = {
    getCart,
    updateCartItem,
    deleteCartItem,
    getCartTotal
}