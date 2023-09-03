import db from "../connection.js";

export default {
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY,
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

    create({ name }) {
        const sql = `INSERT INTO categories(name) VALUES(?)`;

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.bind(id, name);
                stmt.run((err) => {
                    if(err) reject(err)
                    else resolve({name})
                })
            })
        })
    },

    getAll({ pageSize , currentPage, sortBy, order }) {
        let orderquery = "";
        if(sortBy) orderquery = `ORDER BY ${sortBy} ${order}`;

        const sql = `
            SELECT id as categoryId, name as categoryName 
            FROM categories
            ${orderquery}
            LIMIT ${pageSize} OFFSET ${pageSize * (currentPage -1)}
        `;

        const sql2 = `SELECT COUNT(*) as total FROM categories`

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
    }
}