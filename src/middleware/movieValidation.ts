import { body } from "express-validator"

export const movieCreateValidation = () => {
    return [
        body("title")
            .isString()
            .withMessage("O título é obrigatório")
            .isLength({ min: 2 })
            .withMessage("O título deve ter no mínimo 5 caracteres"),
        body("rating")
            .isNumeric()
            .withMessage("A nota precisa ser um número")
            .custom((value: number) => {
                if (value < 0 || value > 10) {
                    throw new Error("A nota precisa estar entre 1 e 10")
                }
                return true
            }),
        body("description")
            .isString()
            .withMessage("A descrição é obrigatória"),
        body("director")
            .isString()
            .withMessage("O nome do diretor é obrigatória"),
        body("poster")
            .isURL()
            .withMessage("A imagem precisa ser uma URL"),
    ]
}