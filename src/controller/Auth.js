import bcrypt from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import db from '../config/database.js'

//----------------------CADASTRO---------------------------------
export async function signUp(req, res) {
    console.log("Rodou POST cadastro")
    const user = req.body;  
  
    const passwordHash = bcrypt.hashSync(user.password, 10);
  
    try {
      await db.collection("users").insertOne({ name: user.name, email: user.email, password: passwordHash });
      res.sendStatus(201);
    } catch (err) {
      return res.status(500).send(err.message);
    }
}
//-----------------------LOGIN-----------------------------------
export async function signIn(req, res) {
    console.log("Rodou POST login")
  
    const { email, password } = req.body;     
  
    try {
      const user = await db.collection("users").findOne({ email });
  
      if (user && bcrypt.compareSync(password, user.password)){

        const token = uuidV4();     

        await db.collection("sessions").insertOne({ userId: user._id, token, name: user.name })

        const session = await db.collection("sessions").findOne({ userId: user._id})        
  
        res.status(200).send(session)
      } else {
        res.sendStatus(401)
      }
  
    } catch (err) {
        return res.status(500).send(err.message)
    }
}
//-----------------------LOGOUT-----------------------------------
export async function logout(req, res) {
    console.log("Rodou DELETE Logout")
    const { token } = req.params;
    console.log(token)
      
    try {	
      
        await db.collection("sessions").deleteOne({ token })

        return res.sendStatus(200)

      } catch (error) {
        res.status(500).send(error)
      }
}