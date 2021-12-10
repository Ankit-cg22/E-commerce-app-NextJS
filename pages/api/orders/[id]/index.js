import nc from 'next-connect'
import Order from '../../../../models/Order'
import db from '../../../../utils/dbConnect'
import {isAuth} from '../../../../utils/auth'
const handler = nc()
handler.use(isAuth)
handler.get(async(req , res) =>{ 
    await db.connect();
    const product = await Order.findById(req.query.id)
    db.disconnect()
    res.send(product)
    console.log(req.query)
    res.send({data : 123})
})

export default handler