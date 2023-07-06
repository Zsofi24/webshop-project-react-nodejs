import db from '../connection.js';
import { nanoid } from 'nanoid';

export default {
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(20) PRIMARY KEY,
            email VARCHAR(30) UNIQUE NOT NULL,
            password VARCHAR(30) NOT NULL,
            username VARCHAR(20) UNIQUE NOT NULL            
        )`
        db.serialize(() => {
            db.run(sql, (err) => {
                if (err) {
                    console.log(`Create users-table failed: ${err.message}`);
                    throw err;
                }
            }),
            (err) => {
                console.log(err);
            }
        })
    },

    create({email, password, username}) {
        const sql = `INSERT INTO users(id, email, password, username) VALUES(?, ?, ?, ?)`;
        const id = nanoid(16);

        console.log(email, password, username);

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.bind(id, email, password, username);
                stmt.run((err) => {
                    if(err) return reject(err)
                    else resolve({message: 'ok'})
                })
            })
        })
    },

    find({ email, password }) {
        const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.bind(email, password);
                stmt.get((err, row) => {
                    if(err) reject(err)
                    if(row) {
                        resolve({...row})
                    } else {
                        console.log("nincs ilyen user");
                        resolve({message: "nincs ilyen user"});
                    }
                })
            })
        })
    }
}