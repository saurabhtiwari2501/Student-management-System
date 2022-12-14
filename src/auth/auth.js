const jwt = require('jsonwebtoken')


const authentication = function (req, res, next) {
  
     
        let token = req.headers["x-api-key"]
        if (!token) {
            return res.status(400).send({message: "No token found" })
        }
        jwt.verify(token, "project", function (err, decodedToken) {
            if (err) {
                return res.status(401).send({message: err.message })
            }
            req.decodedToken = decodedToken
            console.log(decodedToken)
            next()
        })
  
}


module.exports={authentication}