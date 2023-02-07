const Joi = require('joi');

class candidateValidation {

    getCandidateById(params) {
        const schema = Joi.object().keys({
            id: Joi.number().required()
        });
        return schema.validate(params);
    }

    getCandidates(params) {
        const schema = Joi.object().keys({
            page: Joi.required(),
            limit: Joi.required()
        });
        return schema.validate(params);
    }

    getSearchCandidates(params) {
        const schema = Joi.object().keys({
            page: Joi.required(),
            limit: Joi.required()
        });
        return schema.validate(params);
    }
    addCandidates(params) {
        const schema = Joi.object().keys({
            first_name: Joi.string().trim(true).max(40).required(),
            last_name: Joi.string().trim(true).max(40).default(''),
            email: Joi.string().email().max(100).default(''),
            contact_number: Joi.string().max(100).default(''),
            gender: Joi.string().valid('Female', 'Male').default(''),
            specialization: Joi.string().max(200).default(''),
            total_experience: Joi.number().default(''),
            address: Joi.string().max(500),
            work_ex_year: Joi.number(),
            candidate_dob: Joi.number().default(''),
            skills: Joi.string().default('')
        });
        return schema.validate(params);
    }
}


module.exports = new candidateValidation();