import db from './connection.js';
import cartModel from './models/cart-items-model.js';
import ordersModel from './models/orders-model.js';
import ordersProductsModel from './models/orders-products-model.js';
import productsModel from './models/products-model.js';
import usersModel from './models/users-model.js';

export default function databaseInit() {
    db.run('PRAGMA foreign_keys = ON');
    usersModel.createTable();
    productsModel.createTable();
    cartModel.createTable();   
    ordersModel.createTable(); 
    ordersProductsModel.createTable();
}