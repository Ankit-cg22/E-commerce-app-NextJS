import React from 'react'
import Head from 'next/head'
import {AppBar, Container, Toolbar , Typography } from '@material-ui/core'
import useStyles from '../utils/styles'
import NextLink from 'next/link'
import { Link } from '@material-ui/core'

export default function Layout({children , title , description}) {
    const classes = useStyles()

    return (
        <div>
            <Head>
                <title>{title ? {title} : "E-commerce"}</title>
                {description &&  (
                    <meta name = "description" content={description}></meta>
                )}
            </Head>

            <AppBar className = {classes.navbar} position = "static">
                <Toolbar>
                    <NextLink href="/" passHref>
                        <Link >
                            <Typography className ={classes.brandName}>E-commerce</Typography>
                        </Link>
                    </NextLink>

                    <div className={classes.grow}></div>

                    <div>
                        <NextLink href="/cart" passHref>
                            <Link>Cart</Link>
                        </NextLink>
                        <NextLink href="/signin" passHref>
                            <Link>Log In</Link>
                        </NextLink>
                    </div>


                </Toolbar>
            </AppBar>
            
            <Container className = {classes.main}>
                {children}
            </Container>

            <footer className = {classes.footer}>
                <Typography>
                    All rights reserved ! Ankit-cg22
                </Typography>
            </footer>

        </div>
    )
}
