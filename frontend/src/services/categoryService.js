function getCategories() {
    return fetch(`http://localhost:3031/api/categories`)
        .then(resp => resp.json())
}

export const categoryService = {
    getCategories
}