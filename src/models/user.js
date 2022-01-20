const sqlConnection = require("../services/sqlConnection");
const bcrypt = require("bcrypt");
const auth = require("../utils/auth")

function createUser(data, cb){
    var sql = `INSERT INTO users(id,name,createdAt,updatedAt,password)
                 values(id,?,now(),now(), ?);`

    var values = [];
    values.push(data.name);
    values.push(data.password);

    sqlConnection.executeQuery(sql, values, function(err, result){
        cb(err, result);
    })
}

function strongSignup(data, cb){
    var sql = `INSERT INTO users(id,name,createdAt,updatedAt,password)
                 values(id,?,now(),now(), ?);`

    var values = [];
    values.push(data.name);

    bcrypt.hash(data.password, 10, function(err, hash) {
        // Store hash in your password DB.
        if(err){
            console.log(err);
            return;
        }
        values.push(hash);

        sqlConnection.executeQuery(sql, values, function(err, result){
            cb(err, result);
    })
    });
    
}

function userAlreadyExists(data, cb){
    var sql = `SELECT * FROM users WHERE name = ?`;

    var values = [];
    values.push(data.name);

    sqlConnection.executeQuery(sql, values, function(err, result){
        cb(err, result);
    });
}


function getAllUsers(cb){
    var sql = `SELECT name as Name, password as Password FROM users`;

    var values = [];

    sqlConnection.executeQuery(sql, values, function(err, result){
        cb(err, result);
    })
}


function login(data, cb){
    var sql = `SELECT * FROM users WHERE name = ? AND password = ?`;

    var values = [];

    values.push(data.name);
    values.push(data.password);

    sqlConnection.executeQuery(sql, values, function(err, result){
        cb(err, result);
    })
}

function strongLogin(data, cb){
    var sql = `SELECT password FROM users WHERE name = ?`;

    var values = [];

    values.push(data.name);

    sqlConnection.executeQuery(sql, values, function(err, result){
        var isValid = bcrypt.compareSync(data.password, result[0].password);
        // var isValid = bcrypt.compare(data.password, 10).then(function(result) {
            
        // });
        if(isValid){
            const token = auth.newToken(result[0]);
            let responseData = [
                {
                    name : result[0].name,
                    id : result[0].id,
                    authToken : token
                }
            ];

            cb(err, responseData);
        }else{
            cb(err, []);
        }
    })
    
}

function getUserById(data, cb){
    var sql = `SELECT name as Name FROM users WHERE id = ?`;

    var values = [];
    values.push(data.id);

    sqlConnection.executeQuery(sql, values, function (err, result){
        cb(err, result);
    })
}

module.exports = { createUser , getAllUsers, userAlreadyExists, login, strongSignup, strongLogin, getUserById};