import AuthController from "../controllers/AuthController"
import { auth } from "../middlewares/AuthMiddleware"
import validate from "../middlewares/AuthValidator"
import BaseRoutes from "./BaseRouter"

class UserRoutes extends BaseRoutes {
    routes(): void {
        this.router.get("/profile", auth, AuthController.profile)
        this.router.post("/register", validate, AuthController.register)
        this.router.post("/login", validate, AuthController.login)
    }
}

export default new UserRoutes().router
