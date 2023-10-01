import db from "../connection.js";

export default {
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS orders_products (
            order_id VARCHAR(50),
            product_id INTEGER,
            amount INTEGER,
            PRIMARY KEY(order_id, product_id),
            FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,
            FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
        )`
        db.serialize(() => {
            db.run(sql, (err) => {
                if(err) {
                    console.log(`Create orders-products-table failed ${err.message}`);
                    throw err;
                }
            }),
            (err) => console.log(err, "error create orders-products table");
        })
    },

    create({ orderId, cart}) {
        const sql = `INSERT INTO orders_products(order_id, product_id, amount) VALUES(?, ?, ?)`;
        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);
            stmt.bind(orderId, cart);
            cart.forEach(item => {
                stmt.run(orderId, item.id, item.amount)
            })
            stmt.finalize((err) => {
                if(err) reject(err)
                else resolve({orderId})
            })
        })
    }
}