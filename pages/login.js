import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core'
import React from 'react'
import Layout from '../components/layout'
import NextLink from 'next/link'

export default function Login() {
    return (
        <Layout>
            <form>
                <Typography component="h1" variant="h2">
                    Login
                </Typography>
                <List>
                    <ListItem >
                        <TextField fullWidth variant="outlined" id="email" label="Email" inputProps={{type : 'email'}}/>
                    </ListItem>
        
                    <ListItem>
                        <TextField fullWidth variant="outlined" id="password" label="Password" inputProps={{type : 'password'}}/>
                    </ListItem>
                    <ListItem>
                        <Button fullWidth variant="contained">
                            Log In 
                        </Button>
                    </ListItem>
                    <ListItem>
                        Don't have account ?{' '}
                        <NextLink href="/register" passHref><Link><Button variant="outlined">Register</Button></Link></NextLink>
                    </ListItem>
                </List>

            </form>

        </Layout>

    )
}
