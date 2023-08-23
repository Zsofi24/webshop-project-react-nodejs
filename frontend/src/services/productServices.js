function getProducts() {
    return fetch(`http://localhost:3031/api/products`)
        .then(resp => resp.json())
}

function createProduct(product) {
    return fetch(`http://localhost:3031/api/products`, {
        method: "POST",
        body: JSON.stringify(product),
        headers: {"Content-Type": "application/json"}
    })
        .then(resp => resp.json())
}

function addProductToCart(cart) {
    return fetch(`http://localhost:3031/api/cart`, {
        method: "POST",
        body: JSON.stringify(cart),
        headers: {"Content-Type": "application/json"}
    })
        .then(resp => {
            console.log(resp);
        return resp.json()
        } )
}

function getOneProduct(id) {
    return fetch(`http://localhost:3031/api/products/${id}`)
        .then(resp => resp.json())
}

function updateProduct(product, id) {
    return fetch(`http://localhost:3031/api/products/${id}`, {
        method: "POST",
        body: JSON.stringify(product),
        headers: {"Content-Type": "application/json"}
    })
        .then(resp => resp.json())
}

export const productService = {
    getProducts,
    addProductToCart,
    getOneProduct,
    updateProduct,
    createProduct
}