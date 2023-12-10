import db from "../connection.js";

export default {
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS products_categories (
            product_id VARCHAR(42),
            category_id VARCHAR(42),
            PRIMARY KEY(product_id, category_id),
            FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE SET NULL ON UPDATE CASCADE,
            FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE SET NULL ON UPDATE CASCADE
        )`
        db.serialize(() => {
            db.run(sql, (err) => {
                if(err) {
                    console.log(`Create categories-products-table failed ${err.message}`);
                    throw err;
                }
            }),
            (err) => console.log(err, "error create categories-products table");
        })
    },

    getToProduct() {
        const sql = `
            SELECT * FROM products_categories pc
            JOIN categories c ON pc.category_id = c.id        
            WHERE pc.product_id = ?
        `

        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);
            stmt.all((err, rows) => {
                if(err) reject(err)
                if(rows) resolve(rows)
            })
        })
    },

    delete(id)  {
        const sql = 'DELETE FROM products_categories WHERE product_id = ?';

        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);
            stmt.bind(id)
            stmt.run((err) => {
                if(err) reject(err)
                else resolve({ id });
            })
        })
    },

    setToProduct(id, categories) {
        const sql = `
            INSERT INTO products_categories (product_id, category_id) 
            VALUES (?, ?)
        `;
        categories = categories.map(cat => JSON.parse(cat))

        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);
            stmt.bind(id, categories);
            categories?.forEach(cat => {
                stmt.run(id, cat.categoryId)
            })
            stmt.finalize((err) => {
                if(err) reject(err)
                else resolve({id})
            })
        })
    }
}
