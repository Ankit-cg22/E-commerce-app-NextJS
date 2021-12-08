import nc from 'next-connect'
import ProductModel from '../../../models/Product'
import db from '../../../utils/dbConnect'

const handler = nc()

handler.get(async(req , res) =>{ 
    await db.connect();
    const product = await ProductModel.findById(req.query.id)
    db.disconnect()
    res.send(product)
})

export default handler