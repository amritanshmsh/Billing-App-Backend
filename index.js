const express = require('express')
const app = express()
const dotenv = require('dotenv')
const dbConnect = require('./configs/dbConfig')
const cors = require('cors')
dbConnect()
dotenv.config()
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
const productRoute = require('./routes/productRoute')
const adminRoute = require('./routes/adminRoutes')
const billRoute = require('./routes/billRoutes')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())

app.use('/api/v1/product',productRoute)
app.use('/api/v1/admin',adminRoute)
app.use('/api/v1/bill',billRoute)
app.get('/api/v1/health',(req,res)=>{
    res.status(200).json({
        "message": "Server is Running Healthy!"
    })
})

app.use(errorHandler)

app.listen(PORT,(err)=>{
    if(!err) console.log(`Server is running at http://${HOST}:${PORT}`)
})