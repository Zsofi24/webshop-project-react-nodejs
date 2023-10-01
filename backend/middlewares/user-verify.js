import httpError from "../utils/httpError.js";

export default function userVerify(req, res, next) {
    if(req.session.authenticated) next()
    else next(new httpError('failed authentication', 400))
}