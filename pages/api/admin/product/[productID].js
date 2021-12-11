import nc from 'next-connect';
import ProductModel from '../../../../models/Product'
import { isAuth , isAdmin } from '../../../../utils/auth'
import db from '../../../../utils/dbConnect'


const handler = nc()
handler.use(isAuth , isAdmin);

handler.get(async(req , res) =>{ 
   
  await db.connect()
  const product = await ProductModel.findById(req.query.productID);
  await db.disconnect()

  res.send(product)
})


export default handler