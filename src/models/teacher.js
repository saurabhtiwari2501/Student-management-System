const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({

    
    name: { type: String, trim: true },
    email: { type: String, trim: true, unique: true, },
    password: { type: String, trim: true, },
   
  
})

module.exports = mongoose.model('teacher', teacherSchema)
