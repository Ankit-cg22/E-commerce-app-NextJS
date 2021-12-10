import nc from 'next-connect'
import db from '../../../utils/dbConnect'
import OrderModel from '../../../models/Order' 
const handler = nc()

handler.post(async(req , res) =>{ 
    
    await db.connect()

    const newOrder = new OrderModel(
       {
           ...req.body.data
       } ,
    )
    console.log("=====AAA11sAA=====")
    console.log(newOrder)
    const savedOrder = await newOrder.save();

    res.status(201).send({data:123});  
})


export default handler