import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class Authentication {
    static PasswordHash = async (password: string): Promise<string> => {
        return await bcrypt.hash(password, 10)
    }

    static PasswordCompare = async (
        password: string,
        userPassword: string
    ): Promise<boolean> => {
        return await bcrypt.compare(password, userPassword)
    }

    static generateToken = async (
        id: number,
        username: string,
        password: string
    ): Promise<string> => {
        const secretKey = process.env.JWT_SECRET_KEY ?? "secret"

        const token = jwt.sign(
            {
                id,
                username,
                password,
            },
            secretKey
        )
        return token
    }
}

export default Authentication
