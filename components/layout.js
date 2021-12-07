import React from 'react'
import Head from 'next/head'
import {AppBar, Container, Toolbar , Typography } from '@material-ui/core'

export default function Layout({children}) {
    return (
        <div>
            <Head>
                <title>E-commerce</title>
            </Head>

            <AppBar>
                <Toolbar>
                    <Typography>E-commerce</Typography>
                </Toolbar>
            </AppBar>
            
            <Container>
                {children}
            </Container>

            <footer>
                <Typography>
                    All rights reserved ! Ankit-cg22
                </Typography>
            </footer>

        </div>
    )
}
