import db from "../connection.js";

export default {
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS billingaddresses (
            user_id VARCHAR(20) PRIMARY KEY,
            surname VARCHAR(42) NOT NULL,
            familyname VARCHAR(42) NOT NULL,
            city VARCHAR(42) NOT NULL,
            street VARCHAR(42) NOT NULL,
            house_number INTEGER NOT NULL,
            postal_code INTEGER NOT NULL,
            tax_number INTEGER,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        )`
        db.serialize(() => {
            db.run(sql, (err) => {
                if(err) {
                    console.log(`Create billingaddresses-table failed ${err.message}`);
                    throw err;
                }
            }),
            (err) => console.log(err, "error create billingaddresses table");
       })
    },

    getOne({ userId }) {
        const sql = `SELECT * FROM billingaddresses WHERE user_id = ?`;

        return new Promise((resolve, rejecet) => {
            const stmt = db.prepare(sql);
            stmt.bind(userId);
            stmt.get((err, row) => {
                if(err) rejecet(err)
                else if(row) resolve(row)
            })
        })
    },

    create({ userId }, { surname, familyname, city, street, house_number, postal_code, tax_number}) {
        const sql = `
            INSERT OR REPLACE INTO billingaddresses (user_id, surname, familyname, city, street, house_number, postal_code, tax_number)
            VALUES (?, ?, ?, ?, ?, ?, ?, ? )`;
        
        return new Promise((resolve, rejecet) => {
            const stmt = db.prepare(sql);
            stmt.bind(userId, surname, familyname, city, street, house_number, postal_code, tax_number);
            stmt.run((err) => {
                if(err) rejecet(err)
                else resolve({message: "ok"})
            })
        })
            
    }
}