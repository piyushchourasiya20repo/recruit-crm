const jwt = require('jsonwebtoken');
const config = require('config');

class adminAuthenticate {

    async adminLogin(req, res, next) {
        try {
            let token = req.headers.authorization;

            {
                if (!token) {
                    return res.status(404).json({
                        message: `token is required ....!`
                    });
                }
                let token_split = token.split(" ");
                if (token_split[0] !== 'Bearer') {
                    return res.status(300).json({
                        message: 'Token should be in proper format .............!'
                    });
                }
                await jwt.verify(token_split[1], config.get('token.JWT_SECRET_KEY'), function (err, decoded) {
                    if (err) {
                        return res.status(404).json({
                            message: (err.message)
                        });
                    } else {
                        next();
                    }
                });
            }
        } catch (error) {
            console.log(`Catch Block auth.middleware error ==> ${error} & error.message ==> ${error.message}.`);
            return res.status(500).json(error);
        }
    }
}
module.exports = adminAuthenticate;