import nc from 'next-connect'
import UserModel from '../../../models/User'
import db from '../../../utils/dbConnect'
import bcrypt from 'bcryptjs'
import { signToken } from '../../../utils/auth'

const handler = nc()

handler.post(async(req , res) =>{ 
    await db.connect();
    
    const user = await UserModel.findOne({email : req.body.email })
    db.disconnect()
    
    if(user && bcrypt.compareSync(req.body.password , user.password))
    {
        //sign a jwt
        const token = signToken(user);

        // send to front-end
        res.send({
            token ,
            _id:user._id , name: user.name , email : user.email , isAdmin : user.isAdmin
        })
    }else{
        res.status(401).send({message: "Invalid user or password !"})
    }

})

export default handler