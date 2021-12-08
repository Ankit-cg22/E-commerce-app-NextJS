import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core'
import React from 'react'
import Layout from '../components/layout'
import NextLink from 'next/link'


export default function Register() {
    return (
        <div>
            <Layout>
            <form>
                <Typography component="h1" variant="h2">
                    Register
                </Typography>
                <List>
                    <ListItem >
                        <TextField fullWidth variant="outlined" id="text" label="Name" inputProps={{type : 'text'}}/>
                    </ListItem>
                    <ListItem >
                        <TextField fullWidth variant="outlined" id="email" label="Email" inputProps={{type : 'email'}}/>
                    </ListItem>
        
                    <ListItem>
                        <TextField fullWidth variant="outlined" id="password" label="Password" inputProps={{type : 'password'}}/>
                    </ListItem>
                    <ListItem>
                        <TextField fullWidth variant="outlined" id="password" label="Confirm Password" inputProps={{type : 'password'}}/>
                    </ListItem>
                    <ListItem>
                        <Button fullWidth variant="contained">
                            Register
                        </Button>
                    </ListItem>
                    <ListItem>
                        Already have account ? 
                        <NextLink href="/login" passHref><Link><Button variant="outlined">Log In</Button></Link></NextLink>
                    </ListItem>
                </List>

            </form>

        </Layout>
        </div>
    )
}
