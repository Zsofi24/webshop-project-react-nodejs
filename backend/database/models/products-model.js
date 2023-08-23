import db from "../connection.js";

export default {
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS products (
            id VARCHAR PRIMARY KEY,
            title VARCHAR(42) NOT NULL UNIQUE,
            description TEXT,
            price INTEGER,
            stock INTEGER
       )`
       db.serialize(() => {
            db.run(sql, (err) => {
                if(err) {
                    console.log(`Create products-table failed ${err.message}`);
                    throw err;
                }
            }),
            (err) => console.log(err, "error create products table");
       })
    },

    create({title, description, price, stock, id}) {
        const sql = `INSERT INTO products(title, description, price, stock, id) VALUES(?, ?, ?, ?, ?)`;

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.bind(title, description, price, stock, id);
                stmt.run((err) => {
                    if(err) reject(err)
                    else resolve({title, description, price, stock, id})
                })
            })
        })
    },

    getAll() {
        const sql = `SELECT * FROM products`;

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.all((err, rows) => {
                    if(err) reject(err)
                    else resolve(rows)
                })
            })
        })
    },

    getCurrent({ pageSize , currentPage, sortBy, order }) {
        let orderquery = "";
        if(sortBy) orderquery = `ORDER BY ${sortBy} ${order}`
        const sql = `SELECT * FROM products ${orderquery} LIMIT ${pageSize} OFFSET ${pageSize  * (currentPage -1)}`

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.all((err, rows) => {
                    if(err) reject(err)
                    else resolve(rows)
                })
            })
        })
    },

    getOne({ productid }) {
        const sql = 'SELECT * FROM products WHERE id = ?';

        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);
            stmt.bind(productid)
            stmt.get((err, row) => {
                if(err) reject(err)
                else if(row) resolve(row)
                else reject(err)
            })
        })
    },

    edit({ title, price, description, id }) {
        const sql = 'UPDATE products SET title = ?, price = ?, description = ? WHERE id = ?';

        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);
            stmt.bind(title, price, description, id);
            stmt.run(err => {
                if(err) reject(err)
                else resolve({ title, price, description })
            })
        })
    },

    deleteOne({ id }) {
        
    }
}
