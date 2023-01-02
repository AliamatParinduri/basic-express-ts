import { Request, Response, NextFunction } from "express"

import IController from "./ControllerInterface"

type resultType = {
    id: string | number
    name: string
}

let data: resultType[] = [
    { id: 1, name: "Yoga" },
    { id: 2, name: "Yogi" },
]

class UserController implements IController {
    constructor() {}
    index(req: Request, res: Response, next: NextFunction): Response {
        if (data.length < 1) {
            throw new Error("Data tidak ditemukan!")
        }
        return res.status(200).send(data)
    }
    create(req: Request, res: Response, next: NextFunction): Response {
        const { id, name } = req.body

        const findSameID = data.find((dt) => dt.id === +id)

        if (findSameID) {
            throw new Error("Data id sudah ada!")
        }

        data.push({ id, name })
        return res.send({
            message: "Create Sukses",
            data,
        })
    }
    show(req: Request, res: Response, next: NextFunction): Response {
        const { id } = req.params

        const findSameID = data.find((dt) => {
            return dt.id === +id
        })

        if (!findSameID) {
            throw new Error("Data id tidak ditemukan!")
        }

        return res.send({
            message: "Sukses Cari data",
            data: findSameID,
        })
    }
    update(req: Request, res: Response, next: NextFunction): Response {
        const { id } = req.params
        const { name } = req.body

        const findSameID = data.find((dt) => {
            return dt.id === +id
        })

        if (!findSameID) {
            throw new Error("Data id tidak ditemukan!")
        }

        findSameID.id = +id
        findSameID.name = name

        return res.send({
            message: "Sukses update data",
            data,
        })
    }
    delete(req: Request, res: Response, next: NextFunction): Response {
        const { id } = req.params

        const findSameID = data.filter((dt) => {
            return dt.id !== +id
        })

        if (findSameID.length === data.length) {
            throw new Error("Data id tidak ditemukan!")
        }

        data = findSameID

        return res.send({
            message: "Sukses delete data",
            data,
        })
    }
}

export default new UserController()
