
const error = (statusCode, error, description) => {
    return {
        "statusCode": statusCode,
        "error": error,
        "description": description
    }
}

module.exports = error