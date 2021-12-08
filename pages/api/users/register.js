import nc from 'next-connect'
import UserModel from '../../../models/User'
import db from '../../../utils/dbConnect'
import bcrypt from 'bcryptjs'
import { signToken } from '../../../utils/auth'

const handler = nc()

handler.post(async(req , res) =>{ 
    await db.connect();

    const newUser = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
    });

    console.log("nuic")
    console.log(newUser)

    const createdUser = await newUser.save()

    db.disconnect()

    //sign a jwt
    const token = signToken(createdUser);

    // send to front-end
    res.send({
        token ,
        _id:createdUser._id , name: createdUser.name , email : createdUser.email , isAdmin : createdUser.isAdmin
    })
    

})

export default handler