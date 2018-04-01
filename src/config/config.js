
export default (env) => ({
    context: {
        port: env.PORT
    },
    request: {
        bodyLimit: env.BODY_LIMIT,
        corsHeader: env.CORS_HEADER
    }
})