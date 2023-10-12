import HttpError from "../httpError.js";
import { emailValidation, minLength } from "./validation.js";

export function createUserValidation({ email, username, password }) {
    if(!minLength(password, 4)) throw new HttpError('Invalid password', 400)
    if(!minLength(username, 2)) throw new HttpError('Invalid username', 400)
    if(!emailValidation(email)) throw new HttpError('Invalid email', 400)
}
