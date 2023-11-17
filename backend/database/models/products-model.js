import db from "../connection.js";

export default {
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS products (
            id VARCHAR(42) PRIMARY KEY,
            title VARCHAR(42) NOT NULL UNIQUE,
            description TEXT,
            price INTEGER NOT NULL,
            stock INTEGER NOT NULL,
            visible BOOLEAN NOT NULL,
            limited BOOLEAN NOT NULL,
            image_path VARCHAR(42)
       )`
       db.serialize(() => {
            db.run(sql, (err) => {
                if(err) {
                    console.log(`Create products-table failed ${err.message}`);
                    throw err;
                }
            }),
            (err) => console.log(err, 'error create products table');
       })
    },

    create({ title, description, price, stock, id, visible, limited, path }) {
        console.log(stock, "stsock");
        const sql = `
            INSERT INTO products
            (title, description, price, stock, id, visible, limited, image_path) 
            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.bind(title, description, price, stock, id, visible, limited, path);
                stmt.run((err) => {
                    if(err) reject(err)
                    else resolve({ title, description, price, stock, id, visible, limited, path })
                })
            })
        })
    },

    // imgupload(newPath, productid) {
    //     console.log(newPath, productid);
    //     const sql = `UPDATE products SET image_path = ? WHERE id = ?`;

    //     return new Promise((resolve, reject) => {
    //         db.serialize(() => {
    //             const stmt = db.prepare(sql);
    //             stmt.bind(newPath, productid);
    //             stmt.run(err => {
    //                 if(err) reject(err)
    //                 else resolve({newPath, productid})
    //             })
    //         })
    //     })
    // },

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

    getCurrent({ pageSize , page, sortBy, order, filter, products, search }) {
        console.log(search, 'q');
        let orderquery = '';
        let filterquery = '';
        if(sortBy) orderquery = `ORDER BY p.${sortBy} ${order}`;

        if (filter) { filter = filter.map(cat => `'${cat}'`); filterquery = `WHERE c.name IN (${filter})`}
        else  filterquery = ""

        const sql = `
            SELECT p.price, p.id, p.title, p.description, p.stock, p.visible, p.image_path as path, p.limited FROM products p  
            JOIN products_categories pc ON pc.product_id = p.id
            JOIN categories c ON c.id = pc.category_id   
            ${filterquery} 
            AND p.title LIKE '%${search}%'
            AND p.stock > ${products}
            GROUP BY p.id  
            ${orderquery} 
            LIMIT ${pageSize} OFFSET ${pageSize  * (page -1)}             
         `;
        const sql2 = `
            SELECT COUNT(*) as total FROM ( 
                SELECT COUNT(*) FROM products p
                JOIN products_categories pc ON pc.product_id = p.id
                JOIN categories c ON c.id = pc.category_id   
                ${filterquery}
                AND p.title LIKE '%${search}%'
                AND p.stock > ${products}
                GROUP BY p.id
            );

        `;

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.all((err, rows) => {
                    if(err) reject(err)
                    else {
                        const stmt2 = db.prepare(sql2);
                        stmt2.get((err, row) => {
                            if(err) reject(err)
                            else resolve({ products: rows, total: row.total })
                        })
                    }
                })
            })
        })
    },

    getOne({ productid }) {
        const sql = `
            SELECT p.id, p.title, p.description, p.price, p.stock, p.visible, p.image_path as path, p.limited FROM products p
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

    edit({ title, price, description, id, stock, visible, path, limited }) {
        const sql = 'UPDATE products SET title = ?, price = ?, description = ?, stock = ?, visible = ?, image_path = ?, limited = ? WHERE id = ?';

        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);
            stmt.bind(title, price, description, stock, visible, path, limited, id );
            stmt.run(err => {
                if(err) reject(err)
                else resolve({ title, price, description, stock, visible, path, id , limited})
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
