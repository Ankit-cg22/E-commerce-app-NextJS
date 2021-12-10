import nc from 'next-connect'
import ProductModel from '../../models/Product'
import db from '../../utils/dbConnect'
import data from '../../utils/data'
import UserModel from '../../models/User'

const handler = nc()

handler.get(async(req , res) =>{ 
    await db.connect();
    await ProductModel.deleteMany()
    await ProductModel.insertMany(data.products)
    await UserModel.deleteMany()
    await UserModel.insertMany(data.users)
    db.disconnect()
    res.send({message  :  "inserted data successfully"})
})


export default handler