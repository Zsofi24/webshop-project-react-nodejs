import usersServices from "../services/users-services.js";

export default {
    signup(req, res, next) {
        console.log(req.body);
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
        console.log(req.session, "query");
        // req.session.destroy((err) => {
        //     if(err) next(err)
        //     else res.send("ok")
        // })
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
        // console.log(req.body, "body");
        // console.log(req.session.cookie, 'cookie');
        console.log(req.session, 'session');
        // console.log(req.sessionID, "sessid");
        console.log(req.sessionStore, "sessionstore");
        if(req.session.authenticated) {
            res.send(req.session.user)
        } else {
            res.send({message: "nincs bejelentkezve"})
        }
    }
}