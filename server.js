const bodyParser = require("body-parser")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

//configuração basica
const router = require('express').Router()
const app = express()
app.use(bodyParser.json())

//conexão do banco
mongoose.connect('mongodb://127.0.0.1:27017/banco',
 {useNewUrlParser : true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS : 20000});

//model
const UserSchema = new mongoose.Schema({
    name: {type: String},
    email: {type:String, require:true},
    password: {type:String, require:true}
})

const User = mongoose.model('User',UserSchema)

//criando rota de teste
router.post("/cadastro", async(req, res)=>{
    const name = req.bodyParser.name
    const email = req.bodyParser.email
    const password = req.bodyParser.password

    if(name == null || email == null || password == null){
        return res.status(400).json({error: "Digite os campos!!"})
    }

    try{
        const newUser = await User.bulkSave()
        res.json({error: null, msg:"Cadastro !!"})
    }
    catch(error){
        res.status(400).json({error});    
    }});

//criando uma rota com get
app.get("/",(req,res)=>{
    res.sendFile(__dirname + 'index.html')
})

// Faz a leitura de portas
app.listen(3000, ()=>{
    console.log("rodando na porta 3000")
})