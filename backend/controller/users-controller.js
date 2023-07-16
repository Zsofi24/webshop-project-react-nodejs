import usersServices from "../services/users-services.js";

export default {
    signup(req, res, next) {
        const { email, password, username } = req.body;
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

    logout(req, res, next) {
        if(req.session.authenticated) {
            req.session.destroy(err => {
                if(err) res.send(err)
                else {
                    res.clearCookie("sessionID", {path: "/"})
                    res.json({message: "ok"})
                }
            });            
        } else {
            res.send("nincs ilyen session")
        }
    },

    verify(req, res, next) {
        if(req.session.authenticated) {
            res.send(req.session.user)
        } else {
            res.send({message: "nincs bejelentkezve"})
        }
    }
}