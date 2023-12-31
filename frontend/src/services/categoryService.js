import { API_URL } from '../constants';

function getCategories(query) {
    return fetch(`${API_URL}/api/categories?${query}`)
        .then(resp => resp.json())
}

function getAllCategories() {
    return fetch(`${API_URL}/api/allcategories`)
        .then(resp => resp.json())
}

function getOneCategory(id) {
    return fetch(`${API_URL}/api/categories/${id}`, {
        credentials: 'include'
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

function create(category) {
    return fetch(`${API_URL}/api/categories`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(category),
        headers: {'Content-Type': 'application/json'}
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

function updateCategory(updatedcategory, id) {
    return fetch(`${API_URL}/api/categories/${id}`, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(updatedcategory),
        headers: {'Content-Type': 'application/json'}
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

function deleteCategory(id) {
    return fetch(`${API_URL}/api/categories/${id}`, {
        method: 'DELETE',
        credentials: 'include'
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

export const categoryService = {
    getCategories,
    getOneCategory,
    updateCategory,
    getAllCategories,
    create,
    deleteCategory
}