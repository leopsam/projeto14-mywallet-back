import { getHome, getCalculo, postNovaEntrada, postNovaSaida, deleteItem, putItem } from "../controller/Wallet.js"
import { Router } from 'express'
import { verificaToken } from "../middleware/verificaToken.js"
  
const WalletRouter = Router()

WalletRouter.delete("/deletar-item/:id", deleteItem)
WalletRouter.put("/editar-item/:id", putItem)

WalletRouter.use(verificaToken)
WalletRouter.get("/home", getHome)
WalletRouter.get("/calculo", getCalculo)
WalletRouter.post("/nova-entrada", postNovaEntrada)
WalletRouter.post("/nova-saida", postNovaSaida)

export default WalletRouter