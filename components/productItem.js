import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import NextLink from 'next/link'
import useStyles from '../utils/styles'
import {Rating} from '@material-ui/lab'

export default function ProductItem({product}) {
    const classes = useStyles()

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

    return (
        <Card className={classes.productItem}>
            <NextLink href={`/product/${product.slug}`} passHref>
                <CardActionArea>
                    <CardMedia
                        component ="img"
                        image = {product.image}
                        title ={product.name}
                        height= {100}
                        width={200}
                    />
                    
                </CardActionArea>
            </NextLink>
            <NextLink href={`/product/${product.slug}`} passHref>
                <CardActionArea>
                <CardContent>
                        <Typography>{product.name}</Typography>
                        {/* // rating */}
                        <Typography> <Rating readOnly value={avgRating(product.reviews)}/> </Typography>
                    </CardContent>
                    
                </CardActionArea>
            </NextLink>
            <CardActions>
                <Typography>${product.price}</Typography>
            </CardActions>
        </Card>
    )
}
