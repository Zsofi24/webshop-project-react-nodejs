import { nanoid } from "nanoid"

export const productsSeederData = [{
    id: nanoid(8),
    title: "Próba termék",
    price: 12000,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam id similique alias fugit non exercitationem doloribus explicabo dolorum quaerat dolor.",
    stock: 3,
    visible: 0,
    limited: 0,
}]

const titles = [
    "Madaras könyv",
    "Kék könyv",
    "Virágos könyv",
    "Szép könyv",
    "Unalmas könyv",
    "Vicces játék",
    "T játék",
    "B játék", 
]

for (let i = 0; i < titles.length; i++) {
    productsSeederData.push({
        id: nanoid(8),
        title: titles[i],
        price: Math.floor(Math.random() * 30000),
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam id similique alias fugit non exercitationem doloribus explicabo dolorum quaerat dolor.",
        stock: Math.floor(Math.random() * 30),
        visible: Math.ceil(Math.random()),
        limited: Math.ceil(Math.random()),
    })
}