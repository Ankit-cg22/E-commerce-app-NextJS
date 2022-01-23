import mongoose from 'mongoose'

const productsSchema = new mongoose.Schema(
    {
        name: {type : String , required : true},
        slug: {type : String , required : true , unique:true},
        category: {type : String , required : true},
        image: {type : String , required : true},
        price: {type : Number , required : true},
        brand: {type : String , required : true},
        rating: {type : Number , required : true, default :0},
        reviewsCount : {type : Number , required : true, default :0},
        reviews: { type : [{name : String , stars : String  , review : String}] , default: []}, 
        stock: {type : Number , required : true, default :0},
        description: {type : String , required : true},
        randomData : {type : Number , default:0 , required: true}
    } ,
     {
        timestamps : true
    }
)

const ProductsModel = mongoose.models?.ProductsModel || mongoose.model('ProductsModel' ,productsSchema)
// if already such a model is present use it or create a new one

export default ProductsModel