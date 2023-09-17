import { API_URL } from "../constants";

function getProducts(query) {
    return fetch(`${API_URL}/api/products?${query}`)
        .then(resp => resp.json())
}

function createProduct(product) {
    console.log(product, "prod");
    return fetch(`${API_URL}/api/products`, {
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
    return fetch(`${API_URL}/api/products/${productid}/imageupload`, {
        method: "PUT",
        body: file
    })
        .then(resp => resp.json())
}

function addProductToCart(cart) {
    return fetch(`${API_URL}/api/cart`, {
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
    return fetch(`${API_URL}/api/products/${id}`)
        .then(resp => resp.json())
}

function updateProduct(product, id) {
    return fetch(`${API_URL}/api/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(product),
        headers: {"Content-Type": "application/json"}
    })
        .then(resp => resp.json())
}

function deleteProduct(id) {
    return fetch(`${API_URL}/api/products/${id}`, {
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