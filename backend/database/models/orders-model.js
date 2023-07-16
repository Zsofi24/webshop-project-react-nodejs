import db from "../connection.js";

export default {
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS orders (
            id VARCHAR(50) PRIMARY KEY,
            user_id VARCHAR(50) NOT NULL,
            created DATE,
            FOREIGN KEY(user_id) REFERENCES users(id)
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

    create({ id, userid, created }) {
        const sql = `INSERT INTO orders(id, user_id, created) VALUES(?, ?, ?)`;

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.bind(id, userid, created);
                stmt.run((err) => {
                    if(err) reject(err)
                    else resolve({id, userid, created})
                })
            })
        })
    }
}