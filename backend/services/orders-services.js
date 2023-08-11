import { nanoid } from "nanoid";
import ordersModel from "../database/models/orders-model.js";

export default {
    create({ userid, extra_info }) {
        const id = nanoid(10);
        return ordersModel.create({ id, userid, extra_info })
    },

    getUserOrders({ userid }) {
        return ordersModel.getUserOrders({ userid })
    }
}