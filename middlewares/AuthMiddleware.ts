import { RequestHandler } from "express"
import jwt from "jsonwebtoken"

export const auth: RequestHandler = (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization) {
        return res.status(401).send("not authentication, wrong token")
    }

    let secretKey = process.env.JWT_SECRET_KEY ?? "secret"
    const token = authorization.split(" ")[1]

    try {
        const credential: string | object = jwt.verify(token, secretKey)
        if (!credential) {
            return res.send("token invalid")
        }

        req.app.locals.credential = credential
        next()
    } catch (err) {
        res.status(500).send(err)
    }
}
