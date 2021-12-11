import nc from 'next-connect'
import UserModel from '../../../models/User'
import db from '../../../utils/dbConnect'
import bcrypt from 'bcryptjs'
import { signToken , isAuth } from '../../../utils/auth'


const handler = nc()

handler.use(isAuth)

handler.put(async(req , res) =>{ 
    await db.connect();
  
    const updatedUser  = await UserModel.findById(req.user._id)
    updatedUser.name = req.body.name
    updatedUser.email = req.body.email
    updatedUser.password = req.body.password ? bcrypt.hashSync(req.body.password) : updatedUser.password;

    await updatedUser.save()

    await db.disconnect()

    //sign a jwt
    const token = signToken(updatedUser);

    // send to front-end
    res.send({
        token ,
        _id:updatedUser._id , name: updatedUser.name , email : updatedUser.email , isAdmin : updatedUser.isAdmin
    })
    

})

export default handler