const Joi = require('joi');

class authValidation {

    login(params) {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()

        });
        return schema.validate(params);
    }
}

module.exports = new authValidation;