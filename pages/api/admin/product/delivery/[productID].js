import nc from 'next-connect';
import Order from '../../../../../models/Order'
import { isAuth , isAdmin } from '../../../../../utils/auth'
import db from '../../../../../utils/dbConnect'


const handler = nc()
// handler.use(isAuth , isAdmin);

handler.put(async(req, res) => {
    await db.connect()
    
    const product = await Order.findById(req.query.productID);

    if(product){
        product.isDelivered = true
        
        await product.save();
        await db.disconnect()
        res.send({message : "Product delivered successfully"})
    }else{
        await db.disconnect()
        res.send({message : "Product update failed!"})
    }

})


export default handler