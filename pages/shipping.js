import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core'
import React , {useState , useEffect } from 'react'
import Layout from '../components/layout'
import NextLink from 'next/link'
import axios from 'axios'
import { Store } from '../utils/store'
import { useContext } from 'react'
import {useRouter} from 'next/router'
import Cookies from 'js-cookie'
import { Controller , useForm  } from 'react-hook-form'
export default function Shipping() {

    const router = useRouter()
    const {
        handleSubmit , control , formState:{errors}
    }
    const {state, reducer} = useContext(Store)
    const {userInfo }= state

    if(!userInfo)
    {
        router.push('/login?redirect=/shipping')
        // we make use of this redirect query in login page to redirect back to where we came from 
    }

    return (
        <div>
            <h1> Shipping page </h1>
        </div>
    )
}

export default function Login() {
    const router = useRouter()
    const {redirect} = router.query;

    const {state, dispatch} = useContext(Store)

    // if a already logged in user exists , direct him to home page 
    const {userInfo} = state
    useEffect(() => {
        if (userInfo) {
          router.push('/');
        }
      }, []);

    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')

    const submitHandler= async (e) => {
        if(password !== confirmPassword)
        {
            alert("Passwords do not match !!")
            return 
        }


        console.log(name)
        console.log(email)
        console.log(password)

        e.preventDefault();
        try{
            const {data} = await axios.post('/api/users/register' ,{ name , email , password})
            dispatch({type : "USER_LOGIN" , payload : data} )
            Cookies.set('userInfo' , JSON.stringify(data))
            router.push(redirect || '/')
            alert("success")
        }catch(err){        
            alert(err.response?.data? err.response.data.message : err.message)
        }   
    }

    return (
        <Layout>
            <form onSubmit = {submitHandler}>
                <Typography component="h1" variant="h2">
                    Register
                </Typography>
                <List>
                    <ListItem >
                        <TextField 
                        fullWidth 
                        variant="outlined" 
                        id="name" 
                        label="Name" 
                        inputProps={{type : 'test'}}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </ListItem>
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
                        <TextField 
                        fullWidth 
                        variant="outlined" 
                        id="password" 
                        label="Confirm Password" 
                        inputProps={{type : 'password'}}
                        onChange={(e) => setConfirmPassword(e.target.value)}

                        />
                    </ListItem>
                    <ListItem>
                        <Button type="submit" fullWidth variant="contained">
                            Register
                        </Button>
                    </ListItem>
                    <ListItem>
                        Already have account ?{' '}
                        <NextLink href="/login" passHref><Link><Button variant="outlined">Login</Button></Link></NextLink>
                    </ListItem>
                </List>

            </form>

        </Layout>

    )
}
