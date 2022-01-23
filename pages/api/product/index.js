import nc from 'next-connect'
import ProductsModel from '../../../models/Products'
import db from '../../../utils/dbConnect'

const handler = nc()

handler.get(async(req , res) =>{ 
    await db.connect();
    const products = await ProductsModel.find({})
    db.disconnect()
    res.send(products)
})

export default handler