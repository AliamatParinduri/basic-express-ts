import { Response, RequestHandler } from "express"

import Authentication from "../utils/Authentication"

const db = require("../db/models")
import services from "../services/LoginService"

class AuthController {
    register: RequestHandler = async (req, res, next): Promise<Response> => {
        // let { username, password } = req.body
        try {
            // const createdUser = await db.user.create({
            //     username,
            //     password: await Authentication.PasswordHash(password),
            // })

            const service: services = new services(req)
            const createdUser = await service.createdUser()

            return res.status(201).send({
                message: "Berhasil registrasi account",
                createdUser,
            })
        } catch (err) {
            return res.status(404).send(err)
        }
    }
    login: RequestHandler = async (req, res, next): Promise<Response> => {
        // cari data by username

        let { username, password } = req.body

        const user = await db.user.findOne({ where: { username } })
        if (!user) {
            res.status(500).send("user not found!")
        }

        // check password
        let compare = await Authentication.PasswordCompare(
            password,
            user.password
        )

        if (!compare) {
            res.status(500).send("password doesn't match!")
        }

        // generate username
        const token = await Authentication.generateToken(
            user.id,
            username,
            password
        )

        delete user.id
        delete user.password

        return res.status(200).send({
            message: "Berhasil Login",
            token,
            data: user,
        })
    }
    profile: RequestHandler = (req, res, next) => {
        return res.send(req.app.locals.credential)
    }
}

export default new AuthController()
