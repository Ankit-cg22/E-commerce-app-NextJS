import nc from 'next-connect';
import ProductsModel from '../../../../models/Products'
import { isAuth , isAdmin } from '../../../../utils/auth'
import db from '../../../../utils/dbConnect'


const handler = nc()
handler.use(isAuth , isAdmin);

handler.get(async(req , res) =>{ 
   
  await db.connect()
  const product = await ProductsModel.findById(req.query.productID);
  await db.disconnect()

  res.send(product)
})

handler.put(async(req, res) => {
    await db.connect()

    const product = await ProductsModel.findById(req.query.productID);
 

    if(product){
        product.name = req.body.name,
        product.brand = req.body.brand,
        product.price = req.body.price,
        product.category = req.body.category,
        product.description = req.body.description,
        product.slug = req.body.slug,
        product.stock = req.body.count,
        product.image = req.body.image,
        console.log(product)

        const update = await ProductsModel.findByIdAndUpdate(req.query.productID , product )
        // await product.save();

        await db.disconnect()
        res.send({message : "Product updated successfully"})
      }else{
        await db.disconnect()

        res.send({message : "Product update failed!"})
    }

})

handler.delete(async(req,res,next) => {
    await db.connect()
    const product = await ProductsModel.findById(req.query.productID)
    if(product)
    {
      await product.remove()
      await db.disconnect()
      
      res.send({message :"Product deleted successfully"})
    }else{
      
      await db.disconnect()
      res.status(404).send({message : "Product not found"})
    }
  })

handler.post(async(req,res,next)=>{
    await db.connect()
    const addedProduct= new ProductsModel({
        ...req.body,
        rating:0,
        reviewsCount:0
    })
    const product = await addedProduct.save()
    await db.disconnect()
    res.send({message : "Product added"})
})

export default handler