const sqlConnection = require("../services/sqlConnection");

function addPostData(data, cb){
    var sql = `INSERT INTO postdata(id,content,createdAt,updatedAt,categories,username)
                values(id,?,now(),now(),?,?)`;
    
    var values = []
    values.push(data.content);
    values.push(data.categories);
    values.push(data.username);

    sqlConnection.executeQuery(sql, values, function(err, result){
        cb(err, result);
    });
}

function allPosts(cb){
    var sql = `Select id, content, categories, username from postdata`;

    var values = [];

    sqlConnection.executeQuery(sql, values, function(err, result){
        cb(err, result);
    });
}

function fetchPostByCategory(data, cb){
    var sql = `SELECT id , content, username, createdAt from postdata
                WHERE categories=? order by createdAt desc`;
    
    var values = [];
    values.push(data.categories);

    sqlConnection.executeQuery(sql, values, function(err, result){
        cb(err, result);
    });
}

module.exports = {addPostData, fetchPostByCategory, allPosts};