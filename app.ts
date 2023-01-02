import express, { Application, Request, Response, NextFunction } from "express"

import morgan from "morgan"
import compression from "compression"
import helmet from "helmet"
import cors from "cors"
import { config as dotenv } from "dotenv"

import AuthRoutes from "./routes/AuthRoutes"
import UserRoutes from "./routes/UserRoutes"

class App {
    public app: Application

    constructor() {
        this.app = express()
        this.plugins()
        this.routes()
        dotenv()
    }

    protected routes(): void {
        this.app.get("/", (req: Request, res: Response, next: NextFunction) => {
            res.send(`dari route home TS`)
        })
        this.app.use("/api/v1/auth", AuthRoutes)
        this.app.use("/api/v1/users", UserRoutes)
    }

    plugins(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(morgan("dev"))
        this.app.use(cors())
        this.app.use(helmet())
        this.app.use(compression())
    }
}

const app = new App().app

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`running on http://localhost:${port}`)
})
