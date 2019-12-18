const express = require('express');
const sessions = require('express-session');
const KnexSessionStore = require('connect-session-knex')(sessions);

const apiRouter = require('./api-router.js');
const configMiddleware = require('./config-middleware.js');
const knex = require('../dbConfig.js')


const server = express();

configMiddleware(server);

//// sesssions and cookies info
const sessionConfiguration = {
    // session storage options
    name: "chocolatechip", // default would be sid
    secret: "keep it secret, keep it safe!", // used for encryption (must be an environment variable)
    saveUninitialized: true, // has implications with GDPR laws
    resave: false,

    /// how to store session
    store: new KnexSessionStore({
        knex,
        tablename: 'sessions',
        createtable: true,
        sidfieldname: 'id',
        clearInterval: 1000 * 60 * 10,
    }),

    // cookie options
    cookie: {
        maxAge: 1000 * 60 * 10, // 10 mins in milliseconds
        secure: false, // if false the cookie es sent over http, if true only sent over https
        httpOnly: true, // if true JS cannot access the cookie
    },


};

server.use(sessions(sessionConfiguration)); // add a req.session object
server.use('/api', apiRouter);

module.exports = server;