const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const verifyToken = async(req,res,next) => {
  try {

    const token = req.header('Authorization').split(' ')

    if(!token || token.length < 2) {
     res.status(404).json({
        "message":"Token Not Found!"
     })
    }
 
    const decode = jwt.verify(token[1],process.env.SECRET_KEY)
    const isValidAdmin = await Admin.findById(decode.userId)

    if(!isValidAdmin) {
        res.status(401).json({
            "message":"False Token!"
        })
    }
     
    next()
} catch (error) {
    next(error)
}





}

module.exports = {
verifyToken,
}