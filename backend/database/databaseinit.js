import db from './connection.js';
import cartModel from './models/cart-items-model.js';
import categoriesModel from './models/categories-model.js';
import ordersModel from './models/orders-model.js';
import ordersProductsModel from './models/orders-products-model.js';
import productsModel from './models/products-model.js';
import userModel from './models/user-model.js';
import productsCategoresModel from './models/products-categories-model.js';
import billingAddressesModel from './models/billing-addresses-model.js';
import shippingAddressesModel from './models/shipping-addresses-model.js';

export default function databaseInit() {
    db.run('PRAGMA foreign_keys = OFF');
    userModel.createTable();
    productsModel.createTable();
    cartModel.createTable();   
    ordersModel.createTable(); 
    ordersProductsModel.createTable();
    categoriesModel.createTable();
    productsCategoresModel.createTable();
    billingAddressesModel.createTable();
    shippingAddressesModel.createTable();

}