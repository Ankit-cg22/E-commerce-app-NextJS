import {React , useContext} from 'react'
import Head from 'next/head'
import {AppBar, Container, Toolbar , Typography , Batch, Badge } from '@material-ui/core'
import useStyles from '../utils/styles'
import NextLink from 'next/link'
import { Link } from '@material-ui/core'
import {Store} from '../utils/store'


export default function Layout({children , title , description}) {
    const classes = useStyles()
    const {state , dispatch} = useContext(Store)
    const {cart} = state

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
                            <Link>
                            {cart.cartItems.length >0 ?
                             <Badge color="primary" badgeContent={cart.cartItems.length}>Cart</Badge>
                             :
                             "Cart"
                            }
                            </Link>
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
