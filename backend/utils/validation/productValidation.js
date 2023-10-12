import HttpError from "../httpError.js";
import { minLength, minNumber } from "./validation.js";

export function createProductValidation({title, price, stock, categories}) {
    if(!minLength(title, 1)) throw new HttpError('Invalid product name', 400)
    if(!minLength(categories, 1)) throw new HttpError('Invalid category', 400)
    if(!minNumber(price, 0)) throw new HttpError('Invalid price value', 400)
    if(!minNumber(stock, 0)) throw new HttpError('Invalid stock value', 400)
}
