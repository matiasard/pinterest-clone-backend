const getAccessToken = () => {
    if (process.env.ACCESS_TOKEN_SECRET_KEY) {
        return process.env.ACCESS_TOKEN_SECRET_KEY
    }
    throw new Error("ACCESS TOKEN SECRET_KEY NOT PRESENT")
}

const getRefreshAccessToken = () => {
    if (process.env.REFRESH_TOKEN_SECRET_KEY) {
        return process.env.REFRESH_TOKEN_SECRET_KEY
    }
    throw new Error("ACCESS TOKEN SECRET_KEY NOT PRESENT")
}

const getDataBaseURL = () => {
    if (process.env.DATABASE_URL) {
        return process.env.DATABASE_URL
    }
    throw new Error("ACCESS TOKEN DATABASE_URL NOT PRESENT")
}
const getDataBaseURLExternal = () => {
    if (process.env.DATABASE_URL_EXTERNAL) {
        return process.env.DATABASE_URL_EXTERNAL
    }
    throw new Error("ACCESS TOKEN DATABASE_URL_External NOT PRESENT")
}

export const getConfig = () => {
    return {
        accessTokenSecretKey: getAccessToken(),
        refreshTokenSecretKey: getRefreshAccessToken(),
        dbURL: getDataBaseURL(),
        dbURLExternal: getDataBaseURLExternal()
    }
}