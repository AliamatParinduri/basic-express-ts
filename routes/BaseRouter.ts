import { Router } from "express"
import IRouter from "./RouterInterface"

abstract class BaseRoutes implements IRouter {
    router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    abstract routes(): void
}

export default BaseRoutes
