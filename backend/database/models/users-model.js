import db from '../connection.js';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';

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
        // hash-t kivinni a service-be
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                bcrypt.hash(password, 10, (err, hash) => {
                    const stmt = db.prepare(sql);
                    stmt.bind(id, email, hash, username);
                    stmt.run((err) => {
                        if(err) reject(err)
                        else resolve({message: 'ok'})
                    })

                } )
            })
        })
    },

    find({ email, password, req }) {
        const sql = `SELECT * FROM users WHERE email = ?`;
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.bind(email);
                stmt.get((err, row) => {
                    if(err) reject(err)
                    if(row) {
                        bcrypt.compare(password, row.password, (err, response) => {
                            if(err) console.log(err, "login err");
                            if(response) {
                                // console.log("pwd response", response); //true or false
                                req.session.authenticated = true;
                                req.session.user = {
                                    email: row.email,
                                    username: row.username,
                                    localId: row.id                             
                                }; 
                                resolve({localId: row.id, email: row.email, username: row.username })
                            } else {
                                resolve({message: "helytelen email cím vagy jelszó"})
                            }
                        })
                    } else {
                        console.log("nincs ilyen user");
                        resolve({message: "nincs ilyen user"});
                    }
                })
            })
        })
    }
}