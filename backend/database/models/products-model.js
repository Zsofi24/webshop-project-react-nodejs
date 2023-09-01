import db from "../connection.js";

export default {
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS products (
            id VARCHAR PRIMARY KEY,
            title VARCHAR(42) NOT NULL UNIQUE,
            description TEXT,
            price INTEGER,
            stock INTEGER,
            visible BOOLEAN
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

    create({ title, description, price, stock, id, visible }) {
        const sql = `INSERT INTO products(title, description, price, stock, id, visible) VALUES(?, ?, ?, ?, ?, ?)`;

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.bind(title, description, price, stock, id, visible);
                stmt.run((err) => {
                    if(err) reject(err)
                    else resolve({title, description, price, stock, id, visible})
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

    getCurrent({ pageSize , currentPage, sortBy, order, filter }) {
        let orderquery = "";
        let filterquery = "";
        if(sortBy) orderquery = `ORDER BY ${sortBy} ${order}`;

        console.log(filter, "filter");

        if(filter) { filter = filter.map(cat => `'${cat}'`); filterquery = `WHERE c.name IN (${filter})`}
        else  filterquery = ""
        console.log(filterquery, "filterquerry");

        const sql = `
            SELECT p.price, p.id, p.title, p.description, p.stock, p.visible FROM products p ${orderquery}  
            JOIN products_categories pc ON pc.product_id = p.id
            JOIN categories c ON c.id = pc.category_id   
            ${filterquery} 
            GROUP BY p.id  
            LIMIT ${pageSize} OFFSET ${pageSize  * (currentPage -1)}             
         `;
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
            SELECT p.id, p.title, p.description, p.price, p.stock, p.visible FROM products p
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

    edit({ title, price, description, id, stock, visible }) {
        console.log(visible, "visible edit");
        const sql = 'UPDATE products SET title = ?, price = ?, description = ?, stock = ?, visible = ? WHERE id = ?';

        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);
            stmt.bind(title, price, description, stock, visible, id );
            stmt.run(err => {
                if(err) reject(err)
                else resolve({ title, price, description, stock, visible, id })
            })
        })
    },

    delete(id) {
        const sql = `DELETE FROM products WHERE id = ?`;

        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);
            stmt.bind(id);
            stmt.run(err => {
                if(err) reject(err)
                else resolve({ id })
            })
        })
    }
}
