import db from "../connection.js";

export default {
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS orders (
            id VARCHAR(50) PRIMARY KEY,
            user_id VARCHAR(50) NOT NULL,
            created TEXT NOT NULL,
            status VARCHAR(32) NOT NULL,
            extra_info TEXT,
            total INTEGER,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        )`
        db.serialize(() => {
            db.run(sql, (err) => {
                if(err) {
                    console.log(`CREATE orders table failed ${err.message}`);
                    throw err;
                }
            }),
            (err) => console.log(err, "error create orders table ");
        })
    },

    create({ id, userId, extraInfo, total }) {
        const status = 1;
        const sql = `INSERT INTO orders(id, user_id, created, status, extra_info, total) VALUES(?, ?,  datetime('now', 'localtime'), ?, ?, ?)`;

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.bind(id, userId, status, extraInfo, total);
                stmt.run((err) => {
                    if(err) reject(err)
                    else resolve({ id })
                })
            })
        })
    },

    getUserOrders({ userid }) {
        const sql = `SELECT * FROM orders 
                    JOIN orders_products ON orders.id = orders_products.order_id
                    JOIN products ON orders_products.product_id=products.id
                    WHERE orders.user_id = ?
                    `;
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.bind(userid);
                stmt.all((err, rows) => {
                    if(err) reject(err)
                    else resolve(rows)
                })
            })
        })
    }
}