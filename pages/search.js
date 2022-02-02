import React , {useState} from 'react'
import db from '../utils/dbConnect'
import ProductsModel from '../models/Products'
import Layout from '../components/layout'
import { CircularProgress, Typography } from '@material-ui/core'
import ProductItem from '../components/productItem'

export default function Search(props) {
    const {products} = (props)
    console.log("oi")
    const productData = JSON.parse(products)
    console.log(productData)
    const [load, setLoad]=useState(false);
   

    return (
        <Layout>    
            <Typography component="h1" variant ="h3" style={{margin:"10px" , borderBottom:"1px solid grey"}}> Search Results</Typography>

            {load && <CircularProgress/>}

            {productData.length == 0 ?
               
                <Typography variant="h6" style={{margin:"10px"}}> No matching items !!</Typography>
                :
            
                <div>
                    {productData.map(pd => {
                        return(
                            <ProductItem product ={pd}/>
                        )
                                   })}
                    
                </div>
            }
        </Layout>
    )
}

export async function getServerSideProps(context){
    await db.connect()
    const {query} = context
   
    const category = query.query

    const categoryFilter = {category}
    const products = await ProductsModel.find({...categoryFilter})
    const productsCount = products.length
    await db.disconnect()

    const sendData = await JSON.stringify(products)

    return {
        props:{
            products : sendData,
            productsCount
        }
    }
}