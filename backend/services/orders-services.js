import { nanoid } from "nanoid";
import ordersModel from "../database/models/orders-model.js";

export default {
    create({ userid }) {
        const id = nanoid(10);
        const created = Date.now();
        return ordersModel.create({ id, userid, created })
    }
}