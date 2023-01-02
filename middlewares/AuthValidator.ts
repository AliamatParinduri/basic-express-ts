import { RequestHandler } from "express"
import Joi from "joi"

const validate: RequestHandler = (req, res, next) => {
    const { username, password } = req.body

    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),

        password: Joi.string()
            .min(4)
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .required(),
    })

    const Validate = schema.validate({ username, password })

    if (Validate.error) {
        console.log(`kesini`)
        return res.status(422).send({ error: Validate.error.details[0] })
    }
    next()
}

export default validate
