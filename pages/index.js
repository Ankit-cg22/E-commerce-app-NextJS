
import Layout from '../components/layout'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core'

import NextLink from 'next/link'
import db  from '../utils/dbConnect'
import convertDocToObj from '../utils/dbConnect'

import ProductModel from '../models/Product'

export default function Home({productData}) {
 
  return (
     <Layout>

        <h1>E-commerce</h1> 
        <Grid container spacing = {3}>
          {productData.map((product) => (
            <Grid item md = {4} key = {product.name}>
                <Card>
                  <NextLink href={`product/${product.slug}`} passHref>
                    <CardActionArea>
                      <CardMedia component="img" image={product.image} title={product.name} height="200" width="300"/>
                      <CardContent>
                        <Typography>
                          {product.name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Typography>${product.price}</Typography>
                        <Button size ="small" >Add to card</Button>
                      </CardActions>
                     </CardActionArea>
                  </NextLink>
                </Card>
            </Grid>
                    
          ) )}
        </Grid>

     </Layout>
  )
}

export async function getServerSideProps(){
  await db.connect()
  const products = await ProductModel.find({}).lean()
  await db.disconnect()
  return {
    props : {
      productData : products.map(db.convertDocToObj),
    }
  }
}
