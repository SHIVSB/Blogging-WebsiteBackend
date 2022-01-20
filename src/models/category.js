const sqlConnection = require("../services/sqlConnection")

function listCategories(cb){
    var sql = `SELECT id as ID, name as Name FROM categories`;

    var values = [];

    sqlConnection.executeQuery(sql, values,function(err, result){
        cb(err, result);
    })
}

module.exports = {listCategories};