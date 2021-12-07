import React from 'react'
import NextLink from 'next/link'
import Link from 'next/link'
import useStyles from '../utils/styles'
import { Grid , Container, List, ListItem, Typography, Card, Button } from '@material-ui/core'
import Image from 'next/image'

export default function ProductPage({product}) {
    const classes = useStyles()
    return (
    <div>
        
            <div className={classes.section}>
                <NextLink href="/" passHref>
                        Back home
                </NextLink>
            </div>
            <Grid container spacing = {1}>
                <Grid item  md={6} xs ={12}>
                    <Image src={product.image} alt={product.name} width={550} height ={400} layout="responsive" />
                </Grid>
                
                <Grid item md = {3} xs ={12}>
                    <List>
                        <ListItem>
                            <Typography component="h1" variant="h2">
                                {product.name}
                            </Typography>
                        </ListItem>
                        <ListItem>Category :  {product.category}</ListItem>
                        <ListItem>Brand :  {product.brand}</ListItem>
                        <ListItem>Rating :  {product.rating} ({product.reviewsCount} reviews)</ListItem>
                        <ListItem>
                            <Typography>
                                {product.description}
                            </Typography>
                        </ListItem>
                        
                    </List>
                </Grid>

                <Grid item md={3} xs ={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Typography>Price :  ${product.price}</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>Status :  {product.stock >0 ? "Available" : "Out of stock"}</Typography>
                            </ListItem>
                            <ListItem>
                                <Button variant="contained" fullWidth >
                                    Add to cart 
                                </Button>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>

            </Grid>
    </div>
    )
}
