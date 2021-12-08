import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {type : String , required : true},
    email: {type : String , required : true , unique:true},
    password: {type : String , required : true},
    isAdmin: {type : Boolean , required : true , default : false},
   
} , {
    timestamps : true
})

const UserModel = mongoose.models.UserModel || mongoose.model('UserModel' ,userSchema)
// if already such a model is present use it or create a new one

export default UserModel