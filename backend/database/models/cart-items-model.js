import db from "../connection.js";

export default {
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS cart_items (
            user_id VARCHAR(45),
            product_id VARCHAR(45),
            amount INTEGER,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(product_id) REFERENCES products(id),
            PRIMARY KEY (user_id, product_id)
        )`

        db.serialize(() => {
            db.run(sql, (err) => {
                if(err) {
                    console.log(`Create carts-table failed ${err.message}`);
                    throw err;
                }
            }),
            (err) => console.log(err, "error create products table");
        })
    },

    getAmount({productid, userid}) {
        const sql = `SELECT amount FROM cart_items WHERE user_id = ? AND product_id = ?`;
        
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.bind(userid, productid);
                stmt.get((err, row) => {
                    if(err) reject(err)
                    if(row) {
                        resolve({amount: row.amount})
                    } else {
                        resolve({amount: 0})
                    }
                })
            })
        })
    },

    addProduct({ userid, productid, amount }) {
        const sql = `INSERT INTO cart_items (user_id, product_id, amount) VALUES (?, ?, ?)`;
        console.log(userid, "userid");
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.bind(userid, productid, amount);
                stmt.run((err) => {
                    if(err) reject(err)
                    else resolve({ productid, amount})
                })
            })
        })
    },

    getCartTotal({ userid }) {
        const sql = `
            SELECT SUM(subtotal) as total FROM (
                SELECT c.amount * p.price as subtotal FROM cart_items c
                JOIN products p ON c.product_id = p.id
                WHERE c.user_id = ?
                )
            `;
        
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.bind(userid);
                stmt.get((err, row) => {
                    console.log(row, "row");
                    if(err) reject(err)
                    else resolve(row)
                })
            })
        })
    },

    updateAmount({ userid, productid, amount }) {
        const sql = `UPDATE cart_items SET amount = ? WHERE user_id = ? AND product_id = ?`;

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.bind(amount, userid, productid);
                stmt.run((err) => {
                    if(err) reject(err)
                    else resolve({ productid, amount })
                })
            })
        })
    },

    getCartItems({ userid }) {
        const sql = `
            SELECT ci.amount, p.price, p.id, p.title, p.image_path as path FROM cart_items ci 
            JOIN products p ON product_id = id 
            WHERE user_id = ?
        `;

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.bind(userid);
                stmt.all((err, rows) => {
                    console.log(rows);
                    if(err) reject(err)
                    if(rows) {
                        resolve(rows)
                    } else {
                        resolve({})
                    }
                })
            })
        })
    },

    deleteCart({ userid }) {
        const sql = `DELETE FROM cart_items WHERE user_id = ?`;

        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);
            stmt.bind(userid);
            stmt.run((err) => {
                if(err) reject(err)
                else resolve({userid})
            })
        })
    },

    deleteItem({ userid, productid }) {
        const sql = `DELETE FROM cart_items WHERE user_id = ? AND product_id = ?`;

        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);
            stmt.bind(userid, productid);
            stmt.run((err) => {
                if(err) reject(err)
                else resolve({userid, productid})
            })
        })
    }
}