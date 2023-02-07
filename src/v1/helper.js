const connection = require('../../db/sqlconnection');
const util = require('util');

const query = util.promisify(connection.query).bind(connection);

const db = async (query) => {

    let error, result = '';

    let querys = util.promisify(conn.query).bind(conn);

    connection.query(querys, (err, results) => {
        error = err;
        result = results
    });
    return { error, result };

}

module.exports = query;
