let appConfig = {}

appConfig.port=3000;
appConfig.allowedCorsOrigin="*";
appConfig.env="dev";
appConfig.db={
    uri : 'mongodb://127.0.0.1:27017/blogAppDB',
}
appConfig.apiversion = '/app/v1';

module.exports = {

    port:appConfig.port,
    allowedCorsOrigin:appConfig.allowedCorsOrigin,
    environment:appConfig.env,
    db:appConfig.db,
    apiversion:appConfig.apiversion
}