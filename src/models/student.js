const mongoose = require("mongoose")





const studentSchema= new mongoose.Schema(
    {
        userId: {
                  type:mongoose.Schema.Types.ObjectId,
                  ref:"user"
                },
        studentname:String,
        subject:String, 
        marks:Number,
        
 
       isDeleted: { type: Boolean, default: false }
            
        })
  
module.exports = mongoose.model('student', studentSchema)
   