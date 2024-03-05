const express = require('express')
const db = require('mongoose')
const parser = require('body-parser')
const {Expense} = require('./schema.js')
const cors = require('cors')

const port = process.env.PORT || 8000

const url = "mongodb+srv://Mohammed_Ashif:Ashif2005@cluster0.whqaznv.mongodb.net/Expensedb?retryWrites=true&w=majority&appName=Cluster0"

//use() => middlewares
const app = express()
app.use(parser.json())
app.use(cors())

async function connectToDb(){
   try{
    await db.connect(url)
    console.log('DB connected successfully...')
    app.listen(port,()=>{
        console.log(`Listening on port ${port}...`)
    })
   }
   catch(error){
    console.log(error)
   }
}

connectToDb()

app.post('/add',async (req,res)=>{
    try{
        await Expense.create({
            "amount":req.body.amount,
            "catagory":req.body.catagory,
            "date":req.body.date
        })
        res.status(200).json({
            "status":"Success fully added to database"
        })
    }catch(error){
        res.status(500).json({
            "status":error
        })
    }
})

app.get('/getdata',async (req,res)=>{
    try{
        let data = await Expense.find()
        res.status(200).json(data)
        console.log(data)
    }catch(error){
        res.status(500).json({
            "status":"Cannot display data"
        })
    }
})

app.delete('/delete/:id',async (req,res)=>{
    try{
        console.log(req.params.id)
        const data = await Expense.findById(req.params.id)
        if(data){
            await Expense.findByIdAndDelete(req.params.id)
            res.status(200).json({
                "status":"Successfully Deleted"
            })
        }else{
            res.status(404).json({
                "status":"Could not find the documend"
            })
        }
    }catch(error){
        res.status(500).json({
            "status":"Some internal issue"
        })
    }
})

app.patch('/edit/:id',async (req,res)=>{
    try{
        const data = await Expense.findById(req.params.id)
        if(data){
            await data.updateOne({
                "amount":req.body.amount,
                "catagory":req.body.catagory,
                "date":req.body.date
            })
            res.status(200).json({
                "status":"Data Updated Succcessfull"
            })
        }
        else{
            res.status(404).json({
                "status":"Could not find document"
            })
        }
    }catch(error){
        res.status(500).json({
            "status":"Some internal issue"
        })
    }
})