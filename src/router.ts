import { Router, Request, Response } from "express"
import { createMovie, findMovieById, getAllMovies, removeMovie, updateMovie } from "./controllers/movieController"
import { validate } from "./middleware/handleValidation"
import { movieCreateValidation } from "./middleware/movieValidation"

const router = Router()

router.get("/test", (req: Request, res: Response) => {
    res.status(200).send("API is working!")
})

router.post("/movie", movieCreateValidation(), validate, createMovie)

router.get("/movie/:id", findMovieById)

router.get("/movie", getAllMovies)

router.delete("/movie/:id", removeMovie)

router.patch("/movie/:id", movieCreateValidation(), validate, updateMovie)

export default router