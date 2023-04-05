require('dotenv').config()

function roleAuthenticate(req, res, next) {
    if (res.locals.role == process.env.USER)
        return res.sendStatus(401);
    else
        next();

}

module.exports = { roleAuthenticate: roleAuthenticate };