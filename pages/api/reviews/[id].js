import nc from 'next-connect'
import ProductsModel from '../../../models/Products'
import db from '../../../utils/dbConnect'

const handler = nc()

handler.post(async(req , res) =>{ 
    await db.connect();
    const product = await ProductsModel.findById(req.query.id)
    const newReview = req.body
    console.log(newReview)
    console.log(product)
    product.reviews.push(newReview)
    const update = await ProductsModel.findByIdAndUpdate(req.query.id , product , {new : true})

    db.disconnect()

    res.json(update)

})

export default handler