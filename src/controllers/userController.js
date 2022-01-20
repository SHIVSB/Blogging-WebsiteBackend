const User = require("../models/user");
const auth = require("../utils/auth");

function createUser(req, res){
    let data = req.body;

    let responseSend = {
        msg : "Error in creating user",
        success : false,
        result : ""
    }

    if(data.name && data.password){
        User.userAlreadyExists(data, function(err, result){
            if(err){
                console.log("error in creating user");
                return res.status(500).send(responseSend);
            }else if(result.length > 0){
                console.log("User already exists please select another name");
                responseSend.msg = "User already exists please select another name"
                return res.status(500).send(responseSend);
            }else{
                User.strongSignup(data, function(err1, result1){
                    if(err1){
                        console.log("Error in creating user");
                        return res.status(500).send(responseSend);
                    }else{
                        responseSend.msg = "User created successfully",
                        responseSend.success = true,
                        result = result1
            
                        return res.status(200).send(responseSend);
                    }
                })
            }
        })
    }else{
        console.log("Insufficient credentials");
        return res.status(400).send("Insufficient credentials");
    }
}


function login(req, res){
    let data = req.body;

    let responseSend = {
        msg : "Error in logging user",
        success : false,
        result : ""
    }

    if(data.name && data.password){
        User.strongLogin(data, function(err, result){
            if(err){
                console.log("error in logging user");
                return res.status(500).send(responseSend);
            }
            if(result.length === 0){
                console.log("Invalid username or password");
                responseSend.msg = "Invalid username or password";
                res.status(500).send(responseSend);
                
            }
            responseSend.msg = "User logged in successfully";
                responseSend.success = true;
                responseSend.data = {
                    name: result[0].name,
                    id: result[0].id,
                    authToken: result[0].authToken
                };
            
                return res.status(200).send(responseSend);
        })
    }else{
        console.log("Insufficient credentials");
        return res.status(400).send("Insufficient credentials");
    }
}

function getAllUsers(req, res){
    let responseSend = {
        msg : "Error in fetching users",
        success : false,
        result : ""
    }

    User.getAllUsers(function(err, result){
        if(err){
            console.log("Error in fetching user");
            return res.status(500).send(responseSend);
        }else{
            responseSend.msg = "Users fetched successfully",
            responseSend.success = true,
            responseSend.result = result

            return res.status(200).send(responseSend);
        }
    })
}

function isAuthenticated(req, res, next){
    const token = req.headers.auth.split(' ')[1];
    console.log(token);
    console.log("hello")
    // console.log(req.authToken)
    // console.log(req.body.auth);
    // console.log(req.body.auth);
    // console.log(req.headers["auth"]);
    // console.log(req.headers.responseSend.authToken);
    // console.log(req.headers.data.auth);
    // console.log(req.headers.data.authToken);

    let response;
    try{
        response = auth.verifyToken(token);
    }catch(err){
        console.log(err);
        return res.status(401).send({message: "Invalid Token"});
    }

    User.getUserById(response.id, function(err, result){
        if(err){
            console.log("Invalid Authorisation");
            return res.status(401).send({message: "Invalid user"});
        }
        req.user = result;
        next();
    });
}


module.exports = { createUser, getAllUsers, login, isAuthenticated};