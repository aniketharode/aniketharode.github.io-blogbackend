let logger = require("../libs/loggerLib");
let response = require("../libs/responseLib");


let isAuthenticated = (req,res,next) => {


if(req.params.authToken || req.query.authToken || req.header("authToken")){
    if(req.params.authToken=="Admin" || req.query.authToken=="Admin" || req.header('authToken')=="Admin"){
        req.user = {fullName:'Admin',userId:'Admin'};
        next();
    }
    else{
        logger.error("authToken is incorrect","Authentication Middleware",5);
        let apiResponse = response.generate(true,"authtoken is incorrect",403,null);
        res.send(apiResponse);
    }

}
else{
logger.error("authToken is missing","Authentication Middleware",5);
let apiResponse = response.generate(true,"authtoken is missing",403,null);
res.send(apiResponse);
}

}


module.exports = {
    isAuthenticated: isAuthenticated
  }