import db from '../config/database.js'
import dayjs from 'dayjs'
import { ObjectId } from "mongodb"

let data = dayjs().format("DD/MM")

//------------------------HOME-----------------------------------
export async function  getHome(req, res) {
    console.log("Rodou Get Home")
  
    const session = res.locals.sessao
  
    if (!session) return res.status(401).send("Não existe sessão ativa!") 
  
    const user = await db.collection("users").findOne({	_id: session.userId })

    if (!user) return res.status(401).send("Você não fez login")
  
    const wallet = await db.collection("wallet").find({ userId: user._id }).toArray()
    
    if(wallet) { 
        res.send(wallet).status(200)
    } else {
      res.sendStatus(401)
    }
}
//------------------------CALCULO--------------------------------
export async function getCalculo(req, res) {
    console.log("Rodou Get Calculo")
    let calc = 0
    const session = res.locals.sessao
  
    if (!session) return res.sendStatus(401)
  
    const user = await db.collection("users").findOne({	_id: session.userId })
    if (!user) return res.sendStatus(401)
  
    const wallet = await db.collection("wallet").find({ userId: user._id }).toArray()
    if(wallet) { 
  
      wallet.map((w) => {      
          if(w.status === "in"){
            calc += w.valor
          }else if(w.status === "out"){
            calc -= w.valor
          }
      })
      console.log(calc)
  
        res.send(`${calc}`).status(200)
    } else {
      res.sendStatus(401)
    }
}
//-----------------------NOVA-ENTRADA-----------------------------------
export async function postNovaEntrada(req, res) {
    console.log("Rodou POST Nova Entrada")
    const session = res.locals.sessao

    const { descricao, valor } = req.body; 

    try {        
        await db.collection("wallet").insertOne({ userId: session.userId, descricao, valor: Number(valor), date: data, status: "in" })

        res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}
//-----------------------NOVA-SAIDA-----------------------------------
export async function postNovaSaida(req, res) {
    console.log("Rodou POST Nova Saida")
    const session = res.locals.sessao

    const { descricao, valor } = req.body; 

    try {
        await db.collection("wallet").insertOne({ userId: session.userId, descricao, valor: Number(valor), date: data, status: "out" })
  
        res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err.message)
    }
}
//-----------------------EXCLUIR-ITEM-----------------------------------
export async function deleteItem(req, res) {
    console.log("Rodou DELETE Excluir item")
    const { id } = req.params;

    try {	
      const wallet = await db.collection("wallet").findOne({ _id: (ObjectId(id)) })

      if (wallet) {

        await db.collection("wallet").deleteOne({ _id: ObjectId(id) })
        return res.sendStatus(200)
      }
      } catch (error) {
        res.status(500).send(error)
      }


}
//-----------------------EDITAR-ITEM-----------------------------------
export async function putItem(req, res) {
    console.log("Rodou PUT Editar item")
    const { id } = req.params;
    const walletItem = req.body;

    try {
      const result = await db.collection("wallet").updateOne({ _id: ObjectId(id) }, { $set: walletItem });
  
      res.send("Item atualizada");
    } catch (err) {
      return res.status(500).send(err.message);
    }

}

//app.get("/home", async (req, res) => { })
//app.get("/calculo", async (req, res) => { })
//app.post("/nova-entrada", async (req, res) => { })
//app.post("/nova-saida", async (req, res) => { })  
//app.delete("/deletar-item/:id", async (req, res) => {})