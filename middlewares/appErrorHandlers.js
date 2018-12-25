
let errorHandler = (err,req,res,next) => {
    console.log(err);
    console.log("application error handling ");
    res.send("error occured");
}


let notFoundHandler = (req,res,next) => {
    console.log("global not found");
    res.status(404).send("routes not available");
}

module.exports = {
    errorHandler:errorHandler,
    notFoundHandler:notFoundHandler
}