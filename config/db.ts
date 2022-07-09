import mongoose from "mongoose"
import config from "config"
import Logger from "../config/logger"

async function connect() {
    const dbUri = config.get<string>("dbUri")

    try {
        await mongoose.connect(dbUri)
        Logger.info("Conexão ao BD com sucesso")

    } catch (error) {
        Logger.error("Erro ao connectar ao BD")
        Logger.error(error)
        process.exit(1)
    }
}

export default connect