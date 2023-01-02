import { Request } from "express"
import Authentication from "../utils/Authentication"

const db = require("../db/models")

class LoginService {
    credential: {
        id: number
    }
    body: Request["body"]
    params: Request["params"]

    constructor(req: Request) {
        this.credential = req.app.locals.credential
        this.body = req.body
        this.params = req.params
    }

    createdUser = async () => {
        const createdUser = await db.user.create({
            username: this.body.username,
            password: await Authentication.PasswordHash(this.body.password),
        })

        return createdUser
    }
}

export default LoginService
