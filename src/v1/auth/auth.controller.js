const db = require('../helper');
const authValidation = require('./auth.validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('config');

class authController {

    async login(req, res) {
        const { email, password } = req.query
        let { value, error } = authValidation.login(req.query)
        if (error) {
            return res.status(300).json({
                code: 300,
                message: "Validation Fail",
                data: error
            });
        }
        let query1 = `SELECT id, name, email, password, _isAdmin FROM user WHERE email='${email}'`;
        let user = await db(query1);

        if (user.length == 0) {
            return res.status(300).json({
                code: 300,
                message: "Invalid Email or  .....!",
            });
        }

        const isMatch = await bcrypt.compare(password, user[0].password)

        if (!isMatch) {
            return res.status(300).json({
                code: 300,
                message: "Invalid Email or Password .....!",
            });
        }

        const token = await jwt.sign({ id: user[0].id }, config.get('token.JWT_SECRET_KEY'), { expiresIn: '1d' });

        let query2 = `UPDATE user set _lastLogin = '${moment().format('MMMM Do YYYY, h:mm:ss a')}' where email ='${email}'`;
        db(query2);
        return res.status(200).json({
            code: 200,
            message: `Login Successufully .....!`,
            token: token,
        });
    } catch(error) {
        console.log('error', error, '=====', error.message);
        return res.status(500).json(error);
    }
}
module.exports = new authController();