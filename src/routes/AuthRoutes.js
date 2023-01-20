import { signIn, signUp, logout } from "../controller/Auth.js"
import { Router } from 'express'

const authRouter = Router()

// Rotas de autenticação
authRouter.post("/cadastro", signUp)
authRouter.post("/login", signIn)
authRouter.delete("/logout/:token", logout)

export default authRouter


//app.post("/cadastro", async (req, res) => {})
//app.post("/login", async (req, res) => {})
//app.delete("/logout/:token", async (req, res) => { })