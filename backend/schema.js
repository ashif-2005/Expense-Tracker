const database = require('mongoose')

const schema = new database.Schema({
    amount: {
        type:Number
    },
    catagory:{
        type:String
    },
    date:{
        type:String
    }
})

Expense = database.model("expenseinfo",schema)

module.exports = {Expense}