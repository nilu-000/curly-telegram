const Joi = require('joi')

function signinValidate(user){
    const schema = Joi.object({
        email: Joi.string().required().min(8).max(256).email(),
        password: Joi.string().required().min(8).max(256)
    })
    return schema.validate(user);
}

function signupValidate(user){
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(256),
        login: Joi.string().required().min(3).max(256),
        email: Joi.string().required().min(8).max(256).email(),
        password: Joi.string().required().min(8).max(256),
        isAdmin: Joi.Boolean()
    })
    return schema.validate(user);
}

function timesValidate(params){
    const prayerSchema = Joi.object({
        lat: Joi.number().min(-90).max(90),
        long: Joi.number().min(-180).max(180),
        utc: Joi.number().min(-12).max(14)
    });
    return prayerSchema.validate(params);
}

module.exports = {
    signinValidate,
    signupValidate,
    timesValidate
}