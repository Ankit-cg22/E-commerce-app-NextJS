
import Layout from '../components/layout'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core'
import data from '../utils/data'
import NextLink from 'next/link'

export default function Home() {
  return (
     <Layout>

        <h1>E-commerce</h1> 
        <Grid container spacing = {3}>
          {data.products.map((product) => (
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
