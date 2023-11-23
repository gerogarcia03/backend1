import { Router } from "express";
import { usersManagers } from "../manager/UsersManager.js";
import { compareData, generateToken } from '../utils.js'
import passport from "passport"

const router = Router()

router.post('/', async (req, res) => {
    const { username, password } = req.body
    try {
        if (!username || !password) {
            return res.status(400).json({ message: 'faltan datos' })
        }

        const userM = await usersManagers.findUser(username)
        if (!userM) {
            return res.status(400).json({ message: 'primero registrese' })
        }
        const validPassword = await compareData(password, userM.password)
        if (!validPassword) {
            console.log(error)
            return res.status(401).json({ message: 'nombre de usuario o contraseña inválido' })
        }
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }

    router.get('/validation', passport.authenticate('jwt', { session: false }), (req, res) => {
        res.json({ message: 'PROBANDO', user: req.user })

    })
})

export default router
