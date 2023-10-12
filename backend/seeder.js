import db from "./database/connection.js";
import { usersSeederData } from "./seeder/usersSeeder.js";
import { productsSeederData } from "./seeder/productsSeeder.js";
import { categorySeederData, productsCategoriesData } from "./seeder/categorySeeder.js";

db.serialize(() => {
    const stmtUser = db.prepare(`
        INSERT INTO users
        (id, email, password, username, isAdmin, created)
        values (?, ?, ?, ?, ?, datetime('now', 'localtime'))
    `)

    usersSeederData.forEach((user) => {
        stmtUser.run(user.id, user.email, user.password, user.username, user.isAdmin);
      });
    
    stmtUser.finalize();

    const stmtProducts = db.prepare(`
        INSERT INTO products
        (id, title, description, price, stock, visible, limited, image_path)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)

    productsSeederData.forEach((product) => {
        stmtProducts.run(product.id, product.title, product.description, product.price, product.stock, product.visible, product.limited, "uploads/24d68ecfd8c4cd0af0e9b7c107cec453-resized")
    })

    stmtProducts.finalize();

    const stmtCategories = db.prepare(`
        INSERT INTO categories
        (id, name)
        VALUES (?, ?)
    `)

    categorySeederData.forEach(cat => {
        stmtCategories.run(cat.id, cat.name)
    })

    stmtCategories.finalize();

    const stmtProductCategories = db.prepare(`
        INSERT INTO products_categories
        (product_id, category_id)
        VALUES (?, ?)
    `)

    productsCategoriesData.forEach(prodcat => {
        stmtProductCategories.run(prodcat["product_id"], prodcat["category_id"])
    })

    stmtProductCategories.finalize();

    
})