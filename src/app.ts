// ENV variables
require("dotenv").config()

import express from "express"
import config from "config"
import router from "./router"

const app = express()

// JSON middleware
app.use(express.json())

// DB
import db from "../config/db"

// Logger
import Logger from "../config/logger"

// Middlewares
import morganMiddleware from "./middleware/morganMiddleware"

app.use(morganMiddleware)

// Routes
app.use("/api/", router)

// app port
const port = config.get<number>("port")

app.listen(port, async () => {
    await db()
    Logger.info("server is running")
})