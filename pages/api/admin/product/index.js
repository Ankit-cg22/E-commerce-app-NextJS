import nc from 'next-connect';
import ProductsModel from '../../../../models/Products'
import { isAuth , isAdmin } from '../../../../utils/auth'
import db from '../../../../utils/dbConnect'

const handler = nc()
handler.use(isAuth , isAdmin);

handler.post(async(req,res,next)=>{
    console.log("ok")
    await db.connect()
    const addedProduct= new ProductsModel({
        ...req.body,
        rating:0,
        reviewsCount:0
    })
    console.log(addedProduct)
    const product = await addedProduct.save()
    await db.disconnect()
    res.send({message : "Product added"})
})

export default handler