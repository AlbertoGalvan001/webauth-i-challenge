const router = require('express').Router();

const Users = require('./user-model.js');

const RestMiddleware = require('../auth/restricted-middleware');

router.get('/', RestMiddleware, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

module.exports = router;
