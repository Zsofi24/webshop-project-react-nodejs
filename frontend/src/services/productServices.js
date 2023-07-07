function getProducts() {
    return fetch(`http://localhost:3031/api/products`)
        .then(resp => resp.json())
}

function addProductToCart(id) {
    return fetch(`http://localhost:3031/api/cart`, {
        method: "POST",
        body: id,
        headers: {"Content-Type": "application/json"}
    })
    .then(resp => resp.json())
}

export const productService = {
    getProducts,
    addProductToCart
}