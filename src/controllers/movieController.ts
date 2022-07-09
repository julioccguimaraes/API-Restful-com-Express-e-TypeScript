import { Request, Response } from "express"
import { MovieModel } from "../models/Movie";
import Logger from "../../config/logger";

export async function createMovie(req: Request, res: Response) {
    try {
        const data = req.body
        const movie = await MovieModel.create(data)
        return res.status(200).json(movie)
    } catch (error: any) {
        Logger.error("Erro ao criar filme: " + error.message)

        return res.status(500).json({
            error: "Erro interno. Tente mais tarde."
        })
    }
}

export async function findMovieById(req: Request, res: Response) {
    try {
        const movie = await MovieModel.findById(req.params.id)

        if (!movie) {
            return res.status(404).json({
                error: "O filme não existe"
            })
        }
        return res.status(200).json(movie)
    } catch (error: any) {
        Logger.error("Erro ao buscar o filme: " + error.message)

        return res.status(500).json({
            error: "Erro interno. Tente mais tarde."
        })
    }
}

export async function getAllMovies(req: Request, res: Response) {
    try {
        const movies = await MovieModel.find()

        return res.status(200).json(movies)
    } catch (error: any) {
        Logger.error("Erro ao listar filmes: " + error.message)

        return res.status(500).json({
            error: "Erro interno. Tente mais tarde."
        })
    }
}

export async function removeMovie(req: Request, res: Response) {
    try {
        const movie = await MovieModel.findById(req.params.id)

        if (!movie) {
            return res.status(404).json({
                error: "O filme não existe"
            })
        }
        await movie.delete()

        return res.status(200).json({
            msg: "Filme removido com sucesso"
        })

    } catch (error: any) {
        Logger.error("Erro ao remover o filme: " + error.message)

        return res.status(500).json({
            error: "Erro interno. Tente mais tarde."
        })
    }
}

export async function updateMovie(req: Request, res: Response) {
    try {
        const data = req.body
        const movie = await MovieModel.findById(req.params.id)

        if (!movie) {
            return res.status(404).json({
                error: "O filme não existe"
            })
        }

        await MovieModel.updateOne({ _id: req.params.id }, data)

        return res.status(200).json(data)

    } catch (error: any) {
        Logger.error("Erro ao atualizar o filme: " + error.message)

        return res.status(500).json({
            error: "Erro interno. Tente mais tarde."
        })
    }
}