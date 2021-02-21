module.exports = (req, res, next) => {
    if (!req.body.isAdmin)
        res.status(403).send({
            ok: false,
            message: 'Access denied'
        });
    
    next();
}