const mongoose=require("mongoose");

var mongoURL='mongodb+srv://Dristi2003:Dristi2911@cluster0.orc9g.mongodb.net/mern-rooms'
mongoose.connect(mongoURL,{useUnifiedTopology : true,useNewUrlParser:true})

var connection=mongoose.connection
connection.on('error',()=>{
    console.log('Mongo DB Connection failed')

})

connection.on('connected',()=>{
    console.log('Mongo DB Connection Successful')
})

module.exports=mongoose