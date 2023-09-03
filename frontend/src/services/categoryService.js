function getCategories(query) {
    return fetch(`http://localhost:3031/api/categories?${query}`)
        .then(resp => resp.json())
}

export const categoryService = {
    getCategories
}