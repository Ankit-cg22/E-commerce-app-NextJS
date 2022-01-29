import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core'
import React , {useState , useEffect } from 'react'
import Layout from '../components/layout'
import NextLink from 'next/link'
import axios from 'axios'
import { Store } from '../utils/store'
import { useContext } from 'react'
import {useRouter} from 'next/router'
import Cookies from 'js-cookie'
import  {Controller , useForm} from 'react-hook-form'

export default function Login() {
    const {handleSubmit , control , formState : {errors }}= useForm();
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

    const submitHandler= async ({email,password}) => {

        try{
            const {data} = await axios.post('/api/users/login' ,{ email , password})
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
            <form onSubmit = {handleSubmit(submitHandler)} style={{width:"80%" , margin:"auto"}}>
                <Typography component="h1" variant="h2">
                    Login
                </Typography>
                <List>
                    <ListItem >
                        <Controller
                        name ="email"
                        control ={control}
                        defaultValue=""
                        rules={{
                            required:true,
                            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,

                        }}
                        render={({field}) => (
                            <TextField 
                            fullWidth 
                            variant="outlined" 
                            id="email" 
                            label="Email" 
                            inputProps={{type : 'email'}}
                            error = {Boolean(errors.email)}
                            helperText={errors.email?
                                            errors.email.type === 'pattern' ? 'Entered email is not valid!!'             
                                            :
                                            "Email is required" 
                                        :
                                        ""
                                        }
                            {...field}
                            />
                        )}>
                        </Controller>
                        
                    </ListItem>
        
                    <ListItem>
                       
                        <Controller
                            name ="password"
                            control ={control}
                            defaultValue=""
                            rules={{
                                required:true,
                                minLength : 6
                            }}
                            render={({field}) => (
                                <TextField 
                                fullWidth 
                                variant="outlined" 
                                id="password" 
                                label="Password" 
                                inputProps={{type : 'password'}}
                                error = {Boolean(errors.password)}
                                helperText={errors.password?
                                            errors.password.type === 'minLength' ? 'Password length should be at least 6!!'             
                                            :
                                            "Password is required" 
                                        :
                                        ""
                                        }
                                {...field}
        
                                />
                            )}>
                        </Controller>
                    </ListItem>

                    <ListItem>
                        <Button type="submit" fullWidth variant="contained">
                            Log In 
                        </Button>
                    </ListItem>
                    <ListItem>
                        Don't have account ?{' '}
                        <NextLink href="/register" passHref><Link><Button variant="contained">Register</Button></Link></NextLink>
                    </ListItem>
                </List>

            </form>

        </Layout>

    )
}
