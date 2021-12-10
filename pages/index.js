
import Layout from '../components/layout'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core'

import NextLink from 'next/link'
import db  from '../utils/dbConnect'
import ProductModel from '../models/Product'
import {Rating} from '@material-ui/lab'
import CarouselItem from '../components/carouselItem'
import useStyles from '../utils/styles'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

export default function Home({productData}) {
  const classes = useStyles()
  return (
     <Layout>
        <h1>E-commerce</h1> 

          <Slide className={classes.carousel}>
            {productData.map(item => <CarouselItem item={item}/>)}
          </Slide>

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
                        <Rating readOnly value={product.rating}/>

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
