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
             
export default function Register() {
    const router = useRouter()
    const {redirect} = router.query;
    const {handleSubmit , control , formState : {errors }}= useForm();

    const {state, dispatch} = useContext(Store)

    const {userInfo} = state
    
    useEffect(() => {
        if (userInfo)  {
          router.push('/');
        }
      }, []);


    const submitHandler= async ({ name, email , password, confirmPassword}) => {
        if(password !== confirmPassword)
        {
            alert("Passwords do not match !!")
            return 
        }

        // e.preventDefault();
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
            <form onSubmit = {handleSubmit(submitHandler)} style={{width:"80%" , margin:"auto"}}>
                <Typography component="h1" variant="h2">
                    Register
                </Typography>
                <List>
                <ListItem>
                       
                    <Controller
                           name ="name"
                           control ={control}
                           defaultValue=""
                           rules={{
                               required:true,
                               minLength : 2
                           }}
                           render={({field}) => (
                               <TextField 
                               fullWidth 
                               variant="outlined" 
                               id="name" 
                               label="Name" 
                               inputProps={{type : 'text'}}
                               error = {Boolean(errors.name)}
                               helperText={errors.name?
                                           errors.name.type === 'minLength' ? 'Name length should be at least 2!!'             
                                           :
                                           "Name is required" 
                                       :
                                       ""
                                       }
                               {...field}
       
                               />
                           )}>
                       </Controller>
                   </ListItem>
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
                       
                       <Controller
                           name ="confirmPassword"
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
                               id="confirmPassword" 
                               label="Confirm Password" 
                               inputProps={{type : 'password'}}
                               error = {Boolean(errors.password)}
                               helperText={errors.password?
                                           errors.password.type === 'minLength' ? 'Confirm Password length should be at least 6!!'             
                                           :
                                           "Confirm Password is required" 
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
                            Register
                        </Button>
                    </ListItem>
                    <ListItem>
                        Already have account ?{' '}
                        <NextLink href="/login" passHref><Link><Button variant="contained" >Login</Button></Link></NextLink>
                    </ListItem>
                </List>

            </form>

        </Layout>

    )
}
