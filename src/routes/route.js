const express = require("express")
const router = express.Router()

const { authentication } = require("../auth/auth")
const {createstudent,updateStudent,getStudent,studentdelete}= require("../Controller/studentController")
const {createuser,login}= require("../Controller/teacherController")




router.post("/register",createuser)
router.post("/login", login)

router.post("/createstudent",authentication,createstudent)
router.put("/user/:userId",authentication,updateStudent)
router.get("/getStudent/:userId",authentication,getStudent)
router.delete("/studentdelete/:userId",authentication,studentdelete)


 
module.exports=router
