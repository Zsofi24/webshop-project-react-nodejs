function getCategories(query) {
    return fetch(`http://localhost:3031/api/categories?${query}`)
        .then(resp => resp.json())
}

function getAllCategories() {
    return fetch(`http://localhost:3031/api/allcategories`)
        .then(resp => resp.json())
}

function getOneCategory(id) {
    return fetch(`http://localhost:3031/api/categories/${id}`)
        .then(resp => resp.json())
}

function create(category) {
    return fetch(`http://localhost:3031/api/categories`, {
        method: 'POST',
        body: JSON.stringify(category),
        headers: {"Content-Type": "application/json"}
    })
        .then(resp => resp.json())
}

function updateCategory(updatedcategory, id) {
    return fetch(`http://localhost:3031/api/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedcategory),
        headers: {"Content-Type": "application/json"}
    })
        .then(resp => resp.json())
}

export const categoryService = {
    getCategories,
    getOneCategory,
    updateCategory,
    getAllCategories,
    create
}