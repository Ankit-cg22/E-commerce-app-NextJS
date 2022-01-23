
import React from 'react';

import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@material-ui/core'
import NextLink from 'next/link'
import {Rating} from '@material-ui/lab'
import useStyles from '../utils/styles'


export default function CurrentPageProducts({productData , loading}) {

  if(loading)
  {
      return <CircularProgress/>
  }

  
  function avgRating(arr)
  {
    var ar = 0;

    {arr.map( (r) => {
        var r1 = parseInt(r.stars)
        ar+=r1;
    })}

    var len = arr.length;

    ar /= len;
    ar = ar.toFixed(2);
    
    return ar
  }

  return(
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
                        <Rating readOnly value={avgRating(product.reviews)}/>

                      </CardContent>
                      <CardActions>
                        <Typography>${product.price}</Typography>
                      </CardActions>
                     </CardActionArea>
                  </NextLink>
                </Card>
            </Grid>
                    
          ) )}
        </Grid>

  )
}
