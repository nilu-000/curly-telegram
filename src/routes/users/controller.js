const express = require('express');
const router = express.Router();
const {signinValidate, signupValidate} = require('../../libs/joi');
const {getAll, findOne, createUser} = require('./model');
const admin = require('../../middleware/admin');
const auth = require('../../middleware/auth');
const {generateToken} = require('../../libs/jwt');
const {compare} = require('bcrypt');

router.post('/users/signup', async (req, res) => {
    try {
        // validate request
        const {error} = signupValidate(req.body);
        if (error)
            throw new Error(error.details[0].message);
        
        // check existing user in db
        const result = await findOne(req.body.email);
        if (result)
            throw new Error('Existing user');
        
        // create user
        const user = await createUser(req.body);
        res.status(201).send(user);

    } catch (e) {
        res.status(401).send({
            ok: false,
            message: 'cannot register user: ' + e
        });
    }
});

router.post('/users/signin', async (req, res) => {
    try {
        // validate request
        const {error} = signinValidate(req.body);
        if (error)
            throw new Error(error.details[0].message)
        
        // check if user is in db
        const user = await findOne(req.body.email);
        if (!user)
            throw new Error('Check username or password');

        // check pwd
        const isValidPwd = await compare(req.body.password, user.password);
        if (!isValidPassword)
            throw new Error('Check username or password');
        
        // return user
        const token = generateToken({
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin
        })

        res.header('x-auth-token', token).status(200).send({
            ok: true,
            message: user
        });

    } catch (e) {
        res.status(400).send({
            ok: false,
            message: error + ""
        });
    }
});


router.get('/users', [auth, admin], async (req, res) => {
    try {
        const result = await getAll();
        res.status(200).send({
            ok: true,
            message: result
        })        
    } catch (error) {
        res.status(403).send({
            ok: false,
            message: error + ""
        });
    }
})


module.exports = router;