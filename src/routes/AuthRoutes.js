import { signIn, signUp, logout } from "../controller/Auth.js"
import { Router } from 'express'

import { validSchema } from "../middleware/validSchema.js"
import { userSchema, loginSchema } from '../model/AuthSchema.js'


const authRouter = Router()

// Rotas de autenticação
authRouter.post("/cadastro", validSchema(userSchema), signUp)
authRouter.post("/login", validSchema(loginSchema), signIn)
authRouter.delete("/logout/:token", logout)

export default authRouter


//app.post("/cadastro", async (req, res) => {})
//app.post("/login", async (req, res) => {})
//app.delete("/logout/:token", async (req, res) => { })