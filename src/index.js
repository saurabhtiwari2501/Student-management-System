const express=require('express')
const bodyParser = require('body-parser')
const mongoose  = require('mongoose')
const route = require("./routes/route")
const app = express()



app.use(bodyParser.json())


mongoose.connect("mongodb+srv://pritamsam1:Pritamsam1@project.383arvg.mongodb.net/project", {
       useNewUrlParser: true
    })
    .then( () => console.log("MongoDb is connected"))
    .catch ( err => console.log(err) )

    app.use('/', route)
 

app.listen(3000, () => {
  console.log("Running on port 3000.")
})