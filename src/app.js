import express from "express"
import cors from "cors"
import authRouter from "./routes/AuthRoutes.js"
import walletRouter from "./routes/WalletRoutes.js"

const app = express()
app.use(express.json())
app.use(cors())

app.use([authRouter, walletRouter])


app.listen(5000, () => {
  console.log('Servidor rodando!')
})