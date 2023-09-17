function getProducts(query) {
    return fetch(`http://localhost:3031/api/products?${query}`)
        .then(resp => resp.json())
}

function createProduct(product) {
    console.log(product, "prod");
    return fetch(`http://localhost:3031/api/products`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(product)
    })
        .then(resp => {
            console.log(resp, "resp");
            if(!resp.ok) {
                console.log(resp.status, resp.statusText);
                return Promise.reject({
                    status: resp.status,
                    statusText: resp.statusText
                })
            }
            return resp
        })
        .then(resp => resp.json())
}

function uploadimage(file, productid) {
    return fetch(`http://localhost:3031/api/products/${productid}/imageupload`, {
        method: "PUT",
        body: file
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
        method: "PUT",
        body: JSON.stringify(product),
        headers: {"Content-Type": "application/json"}
    })
        .then(resp => resp.json())
}

function deleteProduct(id) {
    return fetch(`http://localhost:3031/api/products/${id}`, {
        method: "DELETE"
    })
        .then(resp => resp.json())
}

export const productService = {
    getProducts,
    addProductToCart,
    getOneProduct,
    updateProduct,
    createProduct,
    deleteProduct,
    uploadimage
}