const category = require("../models/category");

function listCategories(req, res){
    let responseSend = {
        msg : "error in fetching catgories",
        success : false,
        result : ""
    }
    category.listCategories(function(err, result){
        if(err){
            console.log("error in fetching catgories");
            return res.status(500).send(responseSend);
        }else{
            console.log("Categories fetched successfully");
            responseSend.msg = "Categories fetched successfully";
            responseSend.success = true;
            responseSend.result = result;
            return res.status(200).send(responseSend);
        }
    })
}

module.exports = {listCategories};