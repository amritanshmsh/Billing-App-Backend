const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const createAdmin = async(req,res,next) => {
    try {
          const { email, password } = req.body;

          if(!email || !password) {
            res.status(400).json({
                "message":"Bad Request!"
            })
          }

          const hashedPassword = await bcrypt.hash(password,10);

          const newAdmin = new Admin({
            email,
            password: hashedPassword,
          })   
          
         await newAdmin.save()
         res.status(201).json({
            "message":"Admin Created Successfully!"
         })

    } catch (error) {
        next(error)
    }
}

const loginAdmin = async(req,res,next) => {

  try {
  const { email, password } = req.body;

  if(!email || !password) {
      res.status(400).json({
        "message":"Bad Request!"
      })
  }

  const adminDetail = await Admin.findOne({ email: email })
 
  if(!adminDetail) {
    res.status(409).json({
      "message":"Admin not Found!"
    })
  }

  const verifyPassword = await bcrypt.compare(password,adminDetail.password)

  if(!verifyPassword) {
    res.status(409).json({
      "message":"Password Mismatch!"
    })
  }

  const token = jwt.sign({userId: adminDetail._id},process.env.SECRET_KEY)

  res.status(200).json({
   email: email,
   token: token,
  })
} catch (error) {
  next(error)
}
}

module.exports = {
    createAdmin,
    loginAdmin
}