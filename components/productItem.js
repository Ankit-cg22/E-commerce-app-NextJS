import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import NextLink from 'next/link'
import useStyles from '../utils/styles'
import {Rating} from '@material-ui/lab'

export default function ProductItem({product}) {
    const classes = useStyles()
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
                        <Typography> <Rating readOnly value={product.rating}/> </Typography>
                    </CardContent>
                    
                </CardActionArea>
            </NextLink>
            <CardActions>
                <Typography>${product.price}</Typography>
            </CardActions>
        </Card>
    )
}
