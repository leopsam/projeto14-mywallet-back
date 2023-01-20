import {
    getHome,
    getCalculo,
    postNovaEntrada,
    postNovaSaida,
    deleteItem,
    putItem
  } from "../controller/Wallet.js"
  import { Router } from 'express'
  
  const WalletRouter = Router()
  
  // Rotas das receitas
  WalletRouter.get("/home", getHome)
  WalletRouter.get("/calculo", getCalculo)
  WalletRouter.post("/nova-entrada", postNovaEntrada)
  WalletRouter.post("/nova-saida", postNovaSaida)
  WalletRouter.delete("/deletar-item/:id", deleteItem)
  WalletRouter.put("/editar-item/:id", putItem)
  
  export default WalletRouter




//app.get("/home", async (req, res) => { })
//app.get("/calculo", async (req, res) => { })
//app.post("/nova-entrada", async (req, res) => { })
//app.post("/nova-saida", async (req, res) => { })  
//app.delete("/deletar-item/:id", async (req, res) => {})