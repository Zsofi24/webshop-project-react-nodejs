import { productsSeederData } from "./productsSeeder.js"

export const categorySeederData = [
    {
        id: "KONYV-1",
        name: "könyv"
    },
    {
        id: "JATEK-1",
        name: "játék"
    },
    {
        id: "GYEREK",
        name: "gyerek"
    }
]

export const productsCategoriesData = [] 

productsSeederData.forEach(((product, idx) => {
    productsCategoriesData.push({product_id: product.id, category_id: categorySeederData[2].id})
    if(idx < 4) {
        productsCategoriesData.push({product_id: product.id, category_id: categorySeederData[0].id})
    } else {
        productsCategoriesData.push({product_id: product.id, category_id: categorySeederData[1].id})
    }
}))
