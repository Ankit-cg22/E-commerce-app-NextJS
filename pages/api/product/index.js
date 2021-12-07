import nc from 'next-connect'
import ProductModel from '../../../models/Product'
import db from '../../../utils/dbConnect'

const handler = nc()

handler.get(async(req , res) =>{ 
    await db.connect();
    const products = await ProductModel.find({})
    db.disconnect()
    res.send(products)
})

export default handler