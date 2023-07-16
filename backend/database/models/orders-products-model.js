import db from "../connection.js";

export default {
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS orders_products (
            order_id VARCHAR(50),
            product_id INTEGER,
            amount INTEGER,
            PRIMARY KEY(order_id, product_id),
            FOREIGN KEY(order_id) REFERENCES orders(id),
            FOREIGN KEY(product_id) REFERENCES products(id)
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

    create({ orderid, cart}) {
        const sql = `INSERT INTO orders_products(order_id, product_id, amount) VALUES(?, ?, ?)`;

        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);
            stmt.bind(orderid, cart);
            cart.forEach(item => {
                console.log(item, "item");
                stmt.run(orderid, item.product_id, item.amount)
            })
            stmt.finalize((err) => {
                if(err) reject(err)
                else resolve({orderid})
            })
        })
    }
}