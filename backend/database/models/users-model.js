import db from '../connection.js';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import httpError from '../../utils/httpError.js';

export default {
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(20) PRIMARY KEY,
            email VARCHAR(30) UNIQUE NOT NULL,
            password VARCHAR(30) NOT NULL,
            username VARCHAR(20) UNIQUE NOT NULL,
            isAdmin BOOLEAN NOT NULL,
            created TEXT NOT NULL
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

    create({ email, password, username, isAdmin }) {
        const sql = `INSERT INTO users(id, email, password, username, isAdmin, created) VALUES(?, ?, ?, ?, ?, datetime('now', 'localtime'))`;
        const id = nanoid(16);

        console.log(email, password, username, isAdmin);
        // hash-t kivinni a service-be
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                bcrypt.hash(password, 10, (err, hash) => {
                    const stmt = db.prepare(sql);
                    stmt.bind(id, email, hash, username, isAdmin);
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
                                req.session.isAdmin = row.isAdmin;
                                req.session.user = {
                                    email: row.email,
                                    username: row.username,
                                    localId: row.id,
                                    isAdmin: row.isAdmin                            
                                }; 
                                resolve({localId: row.id, email: row.email, username: row.username })
                            } else {
                                reject(new httpError('Bad Request', 400))
                            }
                        })
                    } else {
                        console.log("nincs ilyen user");
                        reject(new httpError('Bad Request', 400));
                    }
                })
            })
        })
    }
}