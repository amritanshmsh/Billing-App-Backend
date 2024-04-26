const Bill = require('../models/Bills')

const billUser = async(req,res,next) => {

    try{

 const { clientName, contactNo, totalAmount, products, paymentMethod} = req.body;

 if(!clientName || !contactNo || !totalAmount || !products || !paymentMethod) {
     res.status(400).json({
         "message": "Bad Request",
     })
 }

 const newBill = new Bill({
    clientName,
    contactNo,
    totalAmount,
    paymentMethod,
    products,
 })

  await newBill.save()
 
 res.status(201).json({
    'message':"Bill Saved Successfully"
 })

} catch (error) {
    next(error)
}

}

const getBills = async(req,res,next) => {
    try{
      const title = req.body.title || "";
   console.log(title)
      const data = await Bill.find({
      clientName : {$regex: title, $options: "i"}
      })
      res.status(200).json({
        "bills": data,
      })

    } catch (error) {
        next(error)
    }
      
}

const deleteBill = async(req,res,next) => {
    try{
        const reqId = req.params.id;
        await Bill.findByIdAndDelete({_id: reqId})
        res.status(200).json({
          "message": "Bill Deleted Successfully!",
        })
  
      } catch (error) {
          next(error)
      }
}

module.exports = {
    billUser,
    getBills,
    deleteBill,
}