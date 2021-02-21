const {verifyToken} = require('../libs/jwt');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token)
        res.status(401).send({
            ok: false,
            message: 'no token'
        });
    
    if(verifyToken(token))
        next();
    else 
    res.status(401).send({
        ok: false,
        message: 'not authorized'
    });
}