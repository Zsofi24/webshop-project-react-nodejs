import {Sequelize} from 'sequelize';
import ProductsModel from './models2/products-model.js';
import UsersModel from './models2/users-model.js';
import CategoriesModel from './models2/categories-model.js';
import OrdersModel from './models2/orders-model.js';
import OrdersProductsModel from './models2/orders-products-model.js';
import UsersProductsModel from './models2/users-products-model.js';
import ShippingAddressesModel from './models2/shippingaddresses-model.js';
import BillingAddressesModel from './models2/billingaddresses-model.js';

const sequelize = new Sequelize('webshop', 'root', 'AlwaysLE.20', {
    "username": "root",
    "password": "AlwaysLE.20",
    "database": "webshop",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": true
  } );

const Users = UsersModel(sequelize, Sequelize);
const Products = ProductsModel(sequelize, Sequelize);
const Categories = CategoriesModel(sequelize, Sequelize);
const Orders = OrdersModel(sequelize, Sequelize);
const OrdersProducts = OrdersProductsModel(sequelize, Sequelize);
const UsersProducts = UsersProductsModel(sequelize, Sequelize);
const ShippingAddresses = ShippingAddressesModel(sequelize, Sequelize);
const BillingAddresses = BillingAddressesModel(sequelize, Sequelize);

Products.belongsToMany(Categories, { through: 'ProductsCategories', foreignKey: 'product_id' });
Categories.belongsToMany(Products, { through: 'ProductsCategories', foreignKey: 'category_id' });

Users.hasMany(Orders, { foreignKey: {name: 'user_id' }});
Orders.belongsTo(Users, { foreignKey: {name: 'user_id' }});

Orders.belongsToMany(Products, { through: OrdersProducts, foreignKey: 'order_id' });
Products.belongsToMany(Orders, { through: OrdersProducts, foreignKey: 'product_id' });

Users.belongsToMany(Products, { through: UsersProducts, foreignKey: 'user_id' });
Products.belongsToMany(Users, { through: UsersProducts, foreignKey: 'product_id' });

Users.hasOne(ShippingAddresses, { foreignKey: 'user_id' });
ShippingAddresses.belongsTo(Users, { foreignKey: 'user_id' });

Users.hasOne(BillingAddresses, { foreignKey: 'user_id' });
BillingAddresses.belongsTo(Users, { foreignKey: 'user_id' });

sequelize.sync();

export {
  sequelize,
  Users,
  Products,
  Categories,
  Orders,
  OrdersProducts,
  UsersProducts,
  ShippingAddresses,
  BillingAddresses
};
