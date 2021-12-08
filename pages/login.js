import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core'
import React , {useState} from 'react'
import Layout from '../components/layout'
import NextLink from 'next/link'
import axios from 'axios'

export default function Login() {

    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const submitHandler= async (e) => {

        e.preventDefault();
        try{
            const {data} = await axios.post('/api/users/login' ,{ email , password})
            alert("success")
        }catch(err){
            alert(err.response.data? err.response.data.message : err.message)
        }   
    }

    return (
        <Layout>
            <form onSubmit = {submitHandler}>
                <Typography component="h1" variant="h2">
                    Login
                </Typography>
                <List>
                    <ListItem >
                        <TextField 
                        fullWidth 
                        variant="outlined" 
                        id="email" 
                        label="Email" 
                        inputProps={{type : 'email'}}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </ListItem>
        
                    <ListItem>
                        <TextField 
                        fullWidth 
                        variant="outlined" 
                        id="password" 
                        label="Password" 
                        inputProps={{type : 'password'}}
                        onChange={(e) => setPassword(e.target.value)}

                        />
                    </ListItem>
                    <ListItem>
                        <Button type="submit" fullWidth variant="contained">
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
