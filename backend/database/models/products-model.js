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

    create({ title, description, price, stock, id }) {
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
        if(sortBy) orderquery = `ORDER BY ${sortBy} ${order}`;
        const sql = `SELECT * FROM products ${orderquery} LIMIT ${pageSize} OFFSET ${pageSize  * (currentPage -1)}`;
        const sql2 = `SELECT COUNT(*) as total FROM products`;

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.all((err, rows) => {
                    if(err) reject(err)
                    else {
                        const stmt2 = db.prepare(sql2);
                        stmt2.get((err, row) => {
                            if(err) reject(err)
                            else resolve({products: rows, total: row.total})
                        })
                    }
                })
            })
        })
    },

    getOne({ productid }) {
        const sql = `
            SELECT p.id, p.title, p.description, p.price, p.stock FROM products p
            WHERE p.id = ?
        `;

        const sql2 = `
            SELECT c.id as categoryId, c.name as categoryName FROM products_categories pc
            JOIN categories c ON pc.category_id = c.id
            WHERE pc.product_id = ?
        `

        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);
            stmt.bind(productid)
            stmt.get((err, row) => {
                if(err) reject(err)
                else if(row) {
                    const stmt2 = db.prepare(sql2);
                    stmt2.bind(productid)
                    stmt2.all((categoryerror, categoryrow) => {
                        if(categoryerror) reject(categoryerror)
                        else if(categoryrow) resolve({...row, categories: [...categoryrow]})
                        else resolve(row)
                    })
                }
                else reject(err)
            })
        })
    },

    edit({ title, price, description, id, stock }) {
        const sql = 'UPDATE products SET title = ?, price = ?, description = ?, stock = ? WHERE id = ?';

        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);
            stmt.bind(title, price, description, id, stock);
            stmt.run(err => {
                if(err) reject(err)
                else resolve({ title, price, description, stock })
            })
        })
    },

    deleteOne({ id }) {
        
    }
}
