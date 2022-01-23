import nc from 'next-connect'
import ProductsModel from '../../../models/Products'
import db from '../../../utils/dbConnect'

const handler = nc()

handler.get(async(req , res) =>{ 
    await db.connect();
    const product = await ProductsModel.findById(req.query.id)
    db.disconnect()
    res.send(product)
})

export default handler