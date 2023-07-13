function getProducts() {
    return fetch(`http://localhost:3031/api/products`)
        .then(resp => resp.json())
}

function addProductToCart(cart) {
    return fetch(`http://localhost:3031/api/cart`, {
        method: "POST",
        body: JSON.stringify(cart),
        headers: {"Content-Type": "application/json"}
    })
    .then(resp => resp.json())
}

export const productService = {
    getProducts,
    addProductToCart
}