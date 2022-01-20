const jwt = require("jsonwebtoken");
const User = require("../models/user");

function newToken(user){
    return jwt.sign({id : user.id}, 'local',
        {expiresIn: '10d'
    });
}

function verifyToken(token){
    try{
        let response = jwt.verify(token,'local');
        return response;
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports = {newToken , verifyToken};

// const jwt = require('jsonwebtoken');
// const {
// 	httpCodes, secretKey
// } = require("../constants/backendConfig");

// module.exports = (req, res, next) => {
// 	const token = req.body.token;
// 	const responseData = {
// 		success: false,
// 		msg: "Unauthorised user"
// 	};
// 	if (!token) {
// 		return res.status(httpCodes.unauthorised).send(responseData);
// 	}
// 	try {
// 		const decodedData = jwt.verify(token, secretKey);
// 		req.userData = decodedData;
// 		next();
// 	} catch (err) {
// 		responseData.msg = "Invalid Token";
// 		return res.status(httpCodes.unauthorised).send(responseData);
// 	}
// };