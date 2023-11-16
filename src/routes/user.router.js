import { Router } from "express";
import { usersManagers } from "../manager/UsersManager";
import { authMiddleware } from "../middlewares/auth.middleware";
import { jwtValidation } from "../middlewares/jwt.middleware";

const router = Router()

router.get('/:username', async (req, res) => {
    const { username } = req.params
    try {
        const user = await usersManagers.findUser(username)
        if (!user) return res.status(404).json(({ message: 'el usuario no ha sido encontrado' }))
        res.status(200).json({ message: 'usuario encontrado', user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:username', async (req, res) => {
    const { username } = req.params
    try {
        const user = await usersManagers.deleteUser(username)
        if (!user) return res.status(404).json({ message: 'el usuario no ha sido encontrado' })
        res.status(200).json({ message: 'usuario eliminado', user })
    } catch (error) {
        return error
    }
})

router.param('username', (req, res, next, username) => {
    const regex = /^[a-zA-Z]+$/
    if(!regex.test(username)) {
        return res.status(500).json({message: 'usuario incorrecto'})
    }
    next()
})

export default router