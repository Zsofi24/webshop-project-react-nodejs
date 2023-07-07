import usersServices from "../services/users-services.js";
import verify from "../middlewares/verify.js";

export default {
    signup(req, res, next) {
        console.log(req.body);
        const { email, password, username } = req.body;
        // console.log(email, password, username);
        usersServices
            .create({email, password, username})
            .then(resp => res.status(201).send(resp.message))
            .catch(next)
    },

    login(req, res, next) {
        const { email, password } = req.body;
        usersServices
            .find({ email, password, req })
            .then(resp => res.status(201).send(resp))
            .catch(next)
    },

    // authentication(req, res, verify, next) {
    //     console.log(req.session, "session")
    //     res.send({message: "ok"})
    // },

    verify(req, res, next) {
        console.log(req.body, "body");
        console.log(req.cookie, 'cookie');
        console.log(req.session, 'session');
        if(req.session.authenticated) {
            res.send(req.session.user)
        } else {
            res.send({message: "nincs bejelentkezve"})
        }
    }
}