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
        const sql = `SELECT id, created, status, total, SUM(amount) as totalAmount FROM orders 
                    JOIN orders_products ON orders.id = orders_products.order_id
                    WHERE orders.user_id = ?
                    GROUP BY id
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
    },

    getOrder({ orderid, userid }) {
        const sql = `
            SELECT id, created, status, total FROM orders            
            WHERE orders.id = ?
        `;

        const sql2 = `
            SELECT op.order_id as orderId, op.product_id as productId, amount, title, description, price, image_path as img FROM orders_products as op
            JOIN products as p ON op.product_id = p.id
            WHERE op.order_id = ?
        `;

        const sql3 = `
            SELECT * FROM shippingaddresses
            WHERE user_id = ?
        `
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.bind(orderid);
                stmt.get((err, orderInfo) => {
                    if(err) reject(err)
                    else {
                        const stmt2 = db.prepare(sql2);
                        stmt2.bind(orderid);
                        stmt2.all((err, orderDetails) => {
                            if(err) reject(err)
                            else {
                                const stmt3 = db.prepare(sql3);
                                stmt3.bind(userid);
                                stmt3.get((err, shippingDetails) => {
                                    if(err) reject(err)
                                    else resolve({info: orderInfo, shipinfo: shippingDetails, products: orderDetails})
                                })
                            }
                        })
                    }
                })
            })
        })
    }
}
