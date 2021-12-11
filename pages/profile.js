import React , {useEffect , useContext} from 'react'
import { Store } from '../utils/store'
import {useRouter} from 'next/router'
import { TextField,Table,Grid, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,Link,CircularProgress, List,ListItem , Button, Card, Tab, ListItemText} from '@material-ui/core'

import Layout from '../components/layout'
import NextLink from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import  {Controller , useForm} from 'react-hook-form'
import Cookies from 'js-cookie'

     
export default function Profile() {
    const router = useRouter()
    const {handleSubmit , control , formState : {errors } , setValue}= useForm();
    const {state , dispatch } = useContext(Store)
    // console.log("state")
    // console.log(state)
    const userInfo = (state.userInfo)
    useEffect(()=>{
        if(!userInfo){
            router.push('/login')
        }
        setValue('name' , userInfo.name)
        setValue('email' , userInfo.email)

    },[])

    const submitHandler= async ({name, email , password, confirmPassword}) => {
        if(password !== confirmPassword)
        {
            alert("Passwords do not match !!")
            return 
        }

       
        try{
            const {data} = await axios.put('/api/users/profile' ,
            { name , email , password} ,
            {
                headers : {
                    authorization : `Bearer ${userInfo.token}`
                }
            })

            dispatch({type : "USER_LOGIN" , payload : data} )
            Cookies.set('userInfo' , JSON.stringify(data))
            
            alert("success")
        }catch(err){        
            alert(err.response?.data? err.response.data.message : err.message)
        }   
    }

    return (
        <Layout >
            <Grid container spacing={1}>
                <Grid item md={3} xs = {11}>
                    <Card>
                        <List>
                            <NextLink href='/profile' passHref>
                                <ListItem selected button component="a">
                                    <ListItemText primary="User Profile"></ListItemText>
                                </ListItem>
                            </NextLink>
                            <NextLink href='/orderHistory' passHref>
                                <ListItem  button component="a">
                                    <ListItemText primary="Order History"></ListItemText>
                                </ListItem>
                            </NextLink>
                        </List>
                    </Card>
                </Grid>
                <Grid item md={9} xs = {11}>
                    <Card>
                        <List>
                            <ListItem>
                                <Typography variant="h3" component = "h1">Profile</Typography>

                            </ListItem>
                            <ListItem>
                            <form onSubmit = {handleSubmit(submitHandler)}>
                                    
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
                                               validate : (value) => {
                                                   value==='' || value.length > 5 || "Password length must be at least 6"
                                               }
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
                                                            'Password length should be at least 6!!'             
                                                            
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
                                                validate : (value) => {
                                                    value==='' || value.length > 5 || "Password length must be at least 6"
                                                }
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
                                                    ' Confirm Password length should be at least 6!!'             
                                                    
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
                                                Update 
                                            </Button>
                                        </ListItem>
                                       
                                    </List>

                             </form>

                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
            
      
        </Layout>

    )
}
