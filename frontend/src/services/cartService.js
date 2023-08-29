function getCart() {
    return fetch(`http://localhost:3031/api/cart`, {
        credentials: 'include'
    })
    .then(resp => resp.json())
}

export const cartService = {
    getCart
}