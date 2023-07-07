export default function verify(req, res, next) {
    if(req.session.authenticated) {
        next();
    }
}