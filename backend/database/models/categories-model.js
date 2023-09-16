import db from "../connection.js";

export default {
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS categories (
            id VARCHAR(42) PRIMARY KEY,
            name VARCHAR(42)
        )`
        db.serialize(() => {
            db.run(sql, (err) => {
                if(err) {
                    console.log(`Create CATEGORIES-table failed ${err.message}`);
                    throw err;
                }
            }),
            (err) => console.log(err, "error create categories table");
       })
    },

    create({ id, name }) {
        const sql = `INSERT INTO categories(id, name) VALUES(?, ?)`;

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.bind(id, name);
                stmt.run((err) => {
                    if(err) reject(err)
                    else resolve({id, name})
                })
            })
        })
    },

    getAll() {
        const sql = `
            SELECT id as categoryId, name as categoryName FROM categories;
        `

        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);
            stmt.all((err, rows) => {
                if(err) reject(err)
                else resolve(rows)
            })
        })
    },

    getCurrent({ pageSize , currentPage, sortBy, order }) {
        let orderquery = "";
        if(sortBy) orderquery = `ORDER BY ${sortBy} ${order}`;

        const sql = `
            SELECT id as categoryId, name as categoryName 
            FROM categories
            ${orderquery}
            LIMIT ${pageSize} OFFSET ${pageSize * (currentPage -1)}
        `;

        const sql2 = `SELECT COUNT(*) as total FROM categories;`

        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);
            stmt.all((err, rows) => {
                if(err) reject(err)
                else {
                    const stmt2 = db.prepare(sql2);
                    stmt2.get((err, row) => {
                        if(err) reject(err)
                        else resolve({categories: rows, total: row.total})
                    })
                }
            })
        })
    },

    getOne({ categoryid }) {
        const sql = `
            SELECT id as categoryId, name as categoryName
            FROM categories
            WHERE id = ?
        `;

        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);
            stmt.bind(categoryid);
            stmt.get((err, row) => {
                if(err) reject(err)
                if(row) resolve(row)
            })
        })
    },

    update(name, id) {
        const sql = `UPDATE categories SET name = ? WHERE id = ?`;

        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);
            stmt.bind(name, id);
            stmt.run((err) => {
                if(err) reject(err)
                else resolve({name, id})
            })
        })
    },

    delete(id) {
        const sql = `DELETE FROM categories WHERE id = ?`;

        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);
            stmt.bind(id);
            stmt.run((err) => {
                if(err) reject(err)
                else resolve({id})
            })
        })

    }
}