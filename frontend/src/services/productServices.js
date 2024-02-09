import { API_URL } from "../constants";

function getProducts(query) {
    return fetch(`${API_URL}/api/products?${query}`)
        .then(resp => resp.json())
}

/**
 * Product is a webshop product with all the saved information in the database.
 * @typedef {Object} Product 
 * @property {string} id
 * @property {string} price
 * @property {string} description
 * @property {boolean} limited
 * @property {boolean} visible
 * @property {string} title
 * @property {string} stock
 * @property {Array} categories
 * @property {File} pic
 */

/**
 * send a new product to the api and create a new product in the database
 * @param {Product} product - new product details
 * @returns {Promise}
 */
function createProduct(product) {
    return fetch(`${API_URL}/api/products`, {
        method: "POST",
        credentials: "include",
        body: product,
    })
        .then(resp => {
            if(!resp.ok) {
                return Promise.reject({
                    status: resp.status,
                    statusText: resp.statusText,
                    message: "Nem sikerült létrehozni a terméket!"
                })
            }
            return resp
        })
        .then(resp => resp.json())
}

function uploadimage(file, productid) {
    return fetch(`${API_URL}/api/products/${productid}/imageupload`, {
        method: "PUT",
        credentials: "include",
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
        .then(resp => resp.json())
}

function getOneProduct(id) {
    return fetch(`${API_URL}/api/products/${id}`)
        .then(resp => resp.json())
}

function updateProduct(product, id) {
    return fetch(`${API_URL}/api/products/${id}`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(product),
        headers: {"Content-Type": "application/json"}
    })
        .then(resp => resp.json())
}

function deleteProduct(id) {
    return fetch(`${API_URL}/api/products/${id}`, {
        credentials: "include",
        method: "DELETE"
    })
        .then(resp => {
            if(!resp.ok) {
                return Promise.reject({
                    status: resp.status,
                    statusText: resp.statusText
                })
            }
            return resp
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
