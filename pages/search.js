import React from 'react'
import db from '../utils/dbConnect'
import ProductModel from '../models/Product'
import Layout from '../components/layout'
import { Typography } from '@material-ui/core'
import ProductItem from '../components/productItem'

export default function Search(props) {
    const {products} = (props)
    console.log("oi")
    const productData = JSON.parse(products)
    console.log(productData)

   

    return (
        <Layout>
            <Typography component="h1" variant ="h3"> Search Results</Typography>

    
            {productData.length == 0 ?
               
                <Typography variant="h6">No matching items !!</Typography>
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
    const products = await ProductModel.find({...categoryFilter})
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