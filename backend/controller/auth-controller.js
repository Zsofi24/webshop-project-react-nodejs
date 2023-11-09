import authServices from '../services/auth-services.js';

export default {
    signup(req, res, next) {
        const { email, password, username } = req.body;
        authServices
            .create({email, password, username})
            .then(resp => res.status(201).json(resp))
            .catch(next)
    },

    login(req, res, next) {
        const { email, password } = req.body;
        console.log(email, password);
        authServices
            .find({ email, password, req })
            .then(resp => res.status(200).json(resp))
            .catch(next)
    },

    logout(req, res, next) {
        if(req.session.authenticated) {
            req.session.destroy(err => {
                if(err) res.send(err)
                else {
                    res.clearCookie("sessionID", {path: '/'})
                    res.status(200).json({message: 'ok'})
                }
            });            
        } else {
            res.send("nincs ilyen session")
        }
    },

    verify(req, res, next) {
        try {
            if(req.session.authenticated) {
                res.status(200).send(req.session.user)
            } else {
                res.status(401).send({message: 'Unauthorized'})
            }
        } catch(err) {
            next(err)
        }
    },

    adminVerify(req, res, next) {
        console.log(req.session);
        try {
            if(req.session.authenticated) {
                if(req.session.isAdmin) res.send({admin: req.session.user})
                else res.status(403).json({message: 'Forbidden'})
            } else {
                res.status(401).send({message: 'Unauthorized'})
            }
        } catch(err) {
            next(err)
        }
    }
}
