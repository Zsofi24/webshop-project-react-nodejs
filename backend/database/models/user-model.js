import bcrypt from 'bcrypt';
import db from '../connection.js';
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

    create({ id, email, hash, username, isAdmin }) {
        const sql = `INSERT INTO users(id, email, password, username, isAdmin, created) VALUES(?, ?, ?, ?, ?, datetime('now', 'localtime'))`;

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(sql);
                stmt.bind(id, email, hash, username, isAdmin);
                stmt.run((err) => {
                    if(err) reject(err)
                    else resolve({message: 'ok'})
                })
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
                            if(err) reject(err);
                            if(response) {
                                req.session.authenticated = true;
                                req.session.isAdmin = row.isAdmin;
                                req.session.user = {
                                    email: row.email,
                                    username: row.username,
                                    localId: row.id,
                                    isAdmin: row.isAdmin                            
                                }; 
                                resolve({ localId: row.id, email: row.email, username: row.username, isAdmin: row.isAdmin })
                            } else {
                                reject(new httpError('Unauthorized', 401))
                            }
                        })
                    } else {
                        reject(new httpError('Unauthorized', 401));
                    }
                })
            })
        })
    },

    getCurrent({ pageSize , page, sortBy, order, search }) {
        let orderquery = "";
        if(sortBy) orderquery = `ORDER BY ${sortBy} ${order}`;

        const sql = `
            SELECT id, email, username, isAdmin, created
            FROM users
            WHERE users.email LIKE'%${search}%'
            ${orderquery}
            LIMIT ${pageSize} OFFSET ${pageSize * (page -1)}
        `;

        const sql2 = `SELECT COUNT(*) as total FROM users;`

        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);
            stmt.all((err, rows) => {
                if(err) reject(err)
                else {
                    const stmt2 = db.prepare(sql2);
                    stmt2.get((err, row) => {
                        if(err) reject(err)
                        else resolve({users: rows, total: row.total})
                    })
                }
            })
        })
    },

    getUser({ userid }) {
        const sql = `
            SELECT id, email, username, isAdmin, created 
            FROM users 
            WHERE id = ?
        `;

        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);
            stmt.bind(userid);
            stmt.get((err, row) => {
                console.log(row, "user data");
                if(err) reject(err)
                else resolve(row)
            })
        })
    },

    updateUser({isAdmin, username, userid}) {
        const sql = `
            UPDATE users
            SET isAdmin = ?, username = ?
            WHERE id = ?
        `;

        return new Promise((resolve, reject) => {
            const stmt = db.prepare(sql);
            stmt.bind(isAdmin, username, userid);
            stmt.run((err) => {
                if(err) reject(err)
                else resolve({userid: userid, isAdmin: isAdmin})
            })
        })
    }
}
