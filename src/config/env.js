
export default (env) => ({
    context: {
        port: env.PORT
    },
    request: {
        bodyLimit: env.BODY_LIMIT,
        corsHeader: env.CORS_HEADER
    },
    db: {
        userName: env.DB_USER_NAME,
        userPassword: env.DB_USER_PASSWORD,
        database: env.DB_DATABASE,
        dialect: env.DB_DIALECT,
        host: env.DB_HOST
    }
})