const user = require("../models/teacher")
const student = require("../models/student")

const isValidRequest = function (object) {
    return Object.keys(object).length > 0
}

const isValid = function (value) {
  if (typeof value === "undefined" || !value) return false
  if (typeof value !== "string" || value.trim().length === 0) return false
  return true
}

const createstudent = async function (req, res) {
  
        let data = req.body
       
        if (!isValidRequest(data)) { return res.status(400).send({message: "user data is required" }) }
        const {studentname,subject,userId,marks}=data

        let studentdata = await student.findOne({studentname:studentname,subject:subject,isDeleted:false})
      
        if(!studentdata || studentdata==null)
            {
              
              let show = await student.create(data)
               
                //let show = await student.findOne({studentname:studentname,subject:subject,isDeleted:false}).select({studentname:1,subject:1,marks:1})
                 
                return res.status(201).send({messege: 'created successfully', Data: show })
      
            }
       
      else
      {           
       
        if(studentdata.studentname==studentname && studentdata.subject==subject)
        {
          
              let nmarks=[],sum=0
                  nmarks.push(studentdata.marks)
                  nmarks.push(marks)
                    
                for(let i=0; i<nmarks.length; i++)
                  {
                       sum += parseInt(nmarks[i])
                  }   
                     
                  studentdata.marks=sum

              let updateData = await student.findOneAndUpdate({studentname:studentname,subject:subject,userId:userId,isDeleted:false},{$set:studentdata},{ new: true })
      
               return res.status(201).send({Data: updateData})
                }
        }
     
      }
   

const updateStudent = async function (req, res) {
   
      let userId = req.params.userId
      let data = req.body
      let { studentname, subject, marks} = data
  
  
      if (!isValidObjectId(userId))
        return res.status(400).send({message: "Please provide a valid userId." })
  
      if (studentname || studentname ==="") {
            if (!isValid(studentname))
              return res.status(400).send({message: "Please enter Student name" })
      }
       
       if (subject || subject ==="") {
        if (!isValid(subject))
          return res.status(400).send({message: "Please enter Subject name" })
       }
        
       if (marks || marks ==="") {
        if (!isValid(marks))
          return res.status(400).send({message: "Please enter Marks" })
       }
           
      let updateData = await student.findOneAndUpdate({studentname: studentname,subject:subject,marks:marks,isDeleted:false}, data, { new: true })
      res.status(200).send({messege: "Updated Successfully",Data: updateData})
    
 
  }
  const getStudent = async function (req, res) {
   
      const userId = req.params.userId
      
       let studentdata = await student.find({userId:userId, isDeleted:false}).select({studentname:1,subject:1,marks:1})
           
       if (!studentdata)
      return res.status(404).send({message: "No Data Found" })
      
      
      return res.status(200).send({Data: studentdata})
    
    
}
const studentdelete = async function (req, res) {
  
      let userId = req.params.userId
       
      let data = req.query

       const {studentname} = data

          student.findOneAndUpdate({studentname:studentname,userId:userId,isdelete:false},{ isDeleted: true}, { new: true })
   

          return res.status(200).send({message: "Successfully Deleted" })
 
}


  module.exports = { createstudent, updateStudent,getStudent,studentdelete} 
