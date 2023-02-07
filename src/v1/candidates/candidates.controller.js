const db = require('../helper');
const config = require('config');
const candidateValidation = require('./candidates.validation');

class candidatesController {

    async getCandidateById(req, res) {
        try {

            let { value, error } = candidateValidation.getCandidateById(req.params);
            if (error) {
                return res.status(300).json({
                    code: 300,
                    message: "Validation Fail",
                    data: error
                });
            }
            let { id } = req.params;

            const query = `SELECT id, first_name, last_name, email, contact_number,  IF(gender = 1, "Male", "Female") as gender, specialization, work_ex_year, candidate_dob, address, skills, created_on, updated_on, concat('${config.get('server.host_url')}','/', resume) resume FROM Candidates WHERE id = ${id}`;
            let data = await db(query);

            return res.status(200).json({
                code: 200,
                Message: 'User Fetch Successfully.....!',
                data
            });

        } catch (error) {
            console.log('error', error, '=====', error.message);
            return res.status(500).json(error);
        }
    }

    async getCandidates(req, res) {
        try {
            let { value, error } = candidateValidation.getCandidates(req.query);
            console.log({value, error})
            if (error) {
                // return res.status(300).json({
                //     code: 300,
                //     message: "Validation Fail",
                //     data: error
                // });
            }
            console.log({value})
            let { page, limit } = req.query;

            let query = `SELECT id, first_name, last_name, email, contact_number,  IF(gender = 1, "Male", "Female") as gender, specialization, work_ex_year, candidate_dob, address, skills, created_on, updated_on, concat('${config.get('server.host_url')}','/', resume) resume FROM candidates LIMIT ${limit} OFFSET ${(page - 1) * limit} `;
            let data = await db(query);
            console.log({data})
            let total_count = (await db(`Select COUNT(id) as count FROM candidates`))[0].count;
            let first_page_url = `http://${config.get('server.host_url')}/v1/candidates?page=1&limit=${limit}`;
            let next_page_url = page * limit < total_count ? `http://${config.get('server.host_url')}/v1/candidates?page=${+page + 1}&limit=${limit}` : null;
            let prev_page_url = +page > 1 ? `http://${config.get('server.host_url')}/v1/candidates?page=${+page - 1}&limit=${limit}` : null;
            let path = `http://${config.get('server.host_url')}/v1/candidates`;

            return res.status(200).json({
                code: 200,
                Message: 'Candidates Fetch successfully .....!',
                page,
                first_page_url,
                from: ((page - 1) * limit) + 1,
                next_page_url,
                path,
                current_page: page,
                per_page: limit,
                prev_page_url,
                to: (page * limit) > total_count ? total_count : (page * limit),
                total_count,
                data
            });

        } catch (error) {
            console.log('error', error, '=====', error.message);
            return res.status(500).json(error);
        }
    }

    async getSearchCandidates(req, res) {
        try {
            let { value, error } = candidateValidation.getSearchCandidates(req.query);
            if (error) {
                return res.status(300).json({
                    code: 300,
                    message: "Validation Fail",
                    data: error
                });
            }
            var { search, page, limit } = req.query;
            if (!search) {
                search = '';
            }

            const query = `SELECT id, first_name, last_name, email, contact_number,  IF(gender = 1, "Male", "Female") as gender, specialization, work_ex_year, candidate_dob, address, skills, created_on, updated_on, concat('${config.get('server.host_url')}','/', resume) resume FROM Candidates
                           WHERE last_name LIKE '%${search}%'
                           OR first_name LIKE '%${search}%'
                           OR email LIKE '%${search}%'
                           LIMIT ${limit} OFFSET ${(page - 1) * limit}`;


            let data = await db(query);
            let total_count = (await db(`Select COUNT(id) as count FROM candidates  WHERE last_name LIKE '%${search}%' OR first_name LIKE '%${search}%' OR email LIKE '%${search}%'`))[0].count;
            let first_page_url = `http://${config.get('server.host_url')}/v1/candidates?page=1&limit=${limit}`;
            let next_page_url = page * limit < total_count ? `http://${config.get('server.host_url')}/v1/candidates?page=${+page + 1}&limit=${limit}` : null;
            let prev_page_url = +page > 1 ? `http://${config.get('server.host_url')}/v1/candidates?page=${+page - 1}&limit=${limit}` : null;
            let path = `http://${config.get('server.host_url')}/v1/candidates`;

            return res.status(200).json({
                code: 200,
                Message: 'Candidates Fetch successfully .....!',
                page,
                first_page_url,
                from: ((page - 1) * limit) + 1,
                next_page_url,
                path,
                current_page: page,
                per_page: limit,
                prev_page_url,
                to: (page * limit) > total_count ? total_count : (page * limit),
                total_count,
                data
            });
        } catch (error) {
            console.log('error', error, '=====', error.message);
            return res.status(500).json(error);
        }
    }

    async addCandidates(req, res) {

        try {
            let { value, error } = candidateValidation.addCandidates(req.body);
            if (error) {
                return res.status(300).json({
                    code: 300,
                    message: "Validation Fail",
                    data: error
                });
            }

            let { first_name, last_name = '', email = '', contact_number = '', gender = '', specialization = '', work_ex_year = '', candidate_dob = '', address = '', skills = '' } = req.body;
            if (gender === "Male") {
                gender = 1
            } else if (gender === "Female") {
                gender = 2
            }
            var file_name = '';
            if (req?.file?.mimetype !== undefined && req?.file?.mimetype !== 'application/pdf') {
                return res.status(300).json({
                    code: 300,
                    message: "Validation Fail",
                    data: `Only .pdf format is allowed .....!`
                });
            } else if (req.file === undefined) {
                file_name = '';
            } else {
                file_name = req.file.filename;
            }

            let query = `INSERT INTO candidates (first_name, last_name, email, contact_number, gender, specialization, work_ex_year, candidate_dob, address, skills, created_on, updated_on,resume) VALUES ('${first_name}', '${last_name}', '${email}', '${contact_number}', '${gender}', '${specialization}',' ${work_ex_year}', '${candidate_dob}', '${address}', '${skills}', '${Math.floor(+new Date() / 1000)}', '${(Math.floor(+new Date() / 1000))}','${file_name}');`;
            let status = await db(query);

            if (status.affectedRows !== 1) {
                return res.status(300).json({
                    code: 300,
                    message: "Some thing went wrong try again later .............!",
                });
            }
            return res.status(200).json({
                code: 200,
                message: "Candidates Details Submited Successfully ...........!",

            });
        } catch (error) {
            console.log('error', error, '=====', error.message);
            return res.status(500).json(error);
        }
    }
}


module.exports = new candidatesController();