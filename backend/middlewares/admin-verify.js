import httpError from "../utils/httpError.js";

export default function adminVerify(req, res, next) {
    console.log(req.session);
    if(req.session.isAdmin) next()
    else next(new httpError('Bad Request', 400))
}