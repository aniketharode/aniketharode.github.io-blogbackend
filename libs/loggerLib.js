const logger = require('pino')()
const moment = require('moment')

let captureError = (errorMessage,errorOrigin,Level) => {

  let currentTime = moment();
let errorResponse = {
       time:currentTime,
       errorMessage:errorMessage,
       errorOrigin:errorOrigin,
       Level:Level
}

logger.error(errorResponse);
return errorResponse;

}


let captureInfo = (Message,Origin,Level) => {

  let currentTime = moment();
let infoResponse = {
       time:currentTime,
       Message:Message,
       Origin:Origin,
       Level:Level
}

logger.info(infoResponse);
return infoResponse;

}

module.exports = {
  error:captureError,
  info:captureInfo
}