import nc from 'next-connect'
import ProductsModel from '../../models/Products'
import db from '../../utils/dbConnect'
import data from '../../utils/data'
import UserModel from '../../models/User'

const handler = nc()

handler.get(async(req , res) =>{ 
    await db.connect();
    await ProductsModel.deleteMany()
    await ProductsModel.insertMany(data.products)
    await UserModel.deleteMany()
    await UserModel.insertMany(data.users)
    db.disconnect()
    res.send({message  :  "inserted data successfully"})
})


export default handler