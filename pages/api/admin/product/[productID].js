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

handler.put(async(req, res) => {
    await db.connect()
    
    const product = await ProductModel.findById(req.query.productID);

    if(product){
        product.name = req.body.name,
        product.brand = req.body.brand,
        product.price = req.body.price,
        product.category = req.body.category,
        product.description = req.body.description,
        product.slug = req.body.slug,
        product.stock = req.body.count,

        await product.save();
        await db.disconnect()
        res.send({message : "Product updated successfully"})
    }else{
        await db.disconnect()
        res.send({message : "Product update failed!"})
    }

})

export default handler