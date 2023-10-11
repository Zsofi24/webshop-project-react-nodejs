import { nanoid } from "nanoid";
import ordersModel from "../database/models/orders-model.js";

export default {
    create({ userId, extraInfo, total }) {
        const id = nanoid(10);
        return ordersModel.create({ id, userId, extraInfo, total })
    },

    getUserOrders({ userid }) {
        return ordersModel.getUserOrders({ userid })
    },

    getOrder({ orderid }) {
        return ordersModel.getOrder({ orderid })
    }

}