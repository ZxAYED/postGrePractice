import dotenv from "dotenv"
import path from "path"

dotenv.config({
    path: path.join(process.cwd(), ".env")
})

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    databaseUrl: process.env.DATABASE_URL,
    jwt: {
        jwt_access_secret_key: process.env.JWT_SECRET_KEY,
        jwt_expires_in: process.env.JWT_EXPIRES_IN,
        jwt_refresh_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    },
    forgot_password_token_expires_in: process.env.FORGOT_PASSWORD_TOKEN_EXPIRES_IN,
    reset_password_link: process.env.RESET_PASSWORD_LINK,
    appPassword : process.env.APP_PASSWORD,
    appEmail : process.env.APP_EMAIL,
    appHost : process.env.SMTP_HOST,
    appPort : process.env.SMTP_PORT,

}