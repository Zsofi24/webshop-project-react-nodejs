import db from "../connection.js";

export default {
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY,
            title VARCHAR(50) NOT NULL UNIQUE,
            description TEXT,
            price INTEGER      
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

    create({title, description, price}) {
        const sql = `INSERT INTO products(title, description, price) VALUES(?, ?, ?)`;

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.bind(title, description, price);
                stmt.run((err) => {
                    if(err) reject(err)
                    else resolve({title, description, price})
                })
            })
        })
    }
}
