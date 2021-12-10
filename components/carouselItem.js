
import React from 'react'
import NextLink from 'next/link'
import useStyles from '../utils/styles'
import { CardActionArea, CardMedia } from '@material-ui/core'

export default function CarouselItem({item}) {
    const classes = useStyles()
    return (
        <NextLink href ={`/product/${item.slug}`} passHref >
            <CardActionArea>
                <CardMedia
                    component ="img"
                    image = {item.image} 
                    height= {250}
                    width={200}
                />
            </CardActionArea>
        </NextLink>

    )
}
