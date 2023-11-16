import { Router } from "express";
import { usersManagers } from "../manager/UsersManager.js";
import { compareData } from '../utils.js'

const router = Router()

router.post('/', async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ message: 'faltan datos' })
    }

    const userM = await usersManagers.findUser(username)
    if (!userM) {
        return res.status(400).json({message:'primero registrese'})
    }

    const validPassword = await compareData(password, userM.password)
    if(!validPassword) {
        console.log(error)
        return res.status(401).json({ message: 'nombre de usuario o contraseña inválido'})
    }

    req.session['username'] = Username
    res.status(200).json({ message: 'sesión creada', usuario: userM})
})

export default router