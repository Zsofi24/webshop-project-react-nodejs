import sqlite3 from 'sqlite3';
import { resolve } from 'path';

sqlite3.verbose();

// console.log(resolve('src', 'database', 'db', 'webshop.db'));
// C:\Users\Felhasználó\projects\webshop-project-react-nodejs\backend\src\database\db\webshop.db

const db = new sqlite3.Database(resolve('database', 'db', 'webshop.db'), (err) => {
    if(err) {
        console.log('Datababase connection error.');
        process.exit(1);
    } else {
        console.log('Database sconnection successful');;
    }
})

export default db;