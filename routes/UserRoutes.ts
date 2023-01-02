import UserController from "../controllers/UserController"
import { auth } from "../middlewares/AuthMiddleware"

import BaseRouter from "./BaseRouter"

class UserRoutes extends BaseRouter {
    routes(): void {
        this.router.get("/", UserController.index)
        this.router.post("/", auth, UserController.create)
        this.router.get("/:id", UserController.show)
        this.router.put("/:id", UserController.update)
        this.router.delete("/:id", UserController.delete)
    }
}

export default new UserRoutes().router
