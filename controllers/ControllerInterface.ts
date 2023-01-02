import { Request, Response, NextFunction } from "express"

interface IController {
    index(req: Request, res: Response, next: NextFunction): Response
    create(req: Request, res: Response, next: NextFunction): Response
    show(req: Request, res: Response, next: NextFunction): Response
    update(req: Request, res: Response, next: NextFunction): Response
    delete(req: Request, res: Response, next: NextFunction): Response
}

export default IController
