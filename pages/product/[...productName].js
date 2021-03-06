import Layout from '../../components/layout'
import ProductPage from '../../components/productDetails'
import useStyles from '../../utils/styles'
import db from '../../utils/dbConnect'
import ProductsModel from '../../models/Products'

export default function ProductDetails({data}) {

    const classes = useStyles()
    const productData = JSON.parse(data)
    console.log(productData)
    if(!productData)
    {
        return (
            <Layout>
                <h1> Product Not Found !!</h1>
            </Layout>
        )
    }

    return (
        
        // <Layout title={productData.name} description ={productData.description.toString()}>
        <Layout > 
            <div className={classes.mainContentSection}>
                <ProductPage product={productData}/>
            </div>
        </Layout>

    )
}


export async function getServerSideProps(context){
    const {params} = context
    const {productName} = params

    await db.connect()
    const product = await ProductsModel.findOne({slug : productName}).lean()
    await db.disconnect()
    const sendProduct = JSON.stringify(product)
    return {
      props : {
        // productData : db.convertDocToObj(product),
        data : sendProduct,
      }
    }
  }
  