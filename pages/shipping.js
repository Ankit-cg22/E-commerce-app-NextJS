import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core'
import React , {useState , useEffect } from 'react'
import Layout from '../components/layout'
import NextLink from 'next/link'
import { Store } from '../utils/store'
import { useContext } from 'react'
import {useRouter} from 'next/router'
import Cookies from 'js-cookie'
import  {Controller , useForm} from 'react-hook-form'
import ShoppingSteps from '../components/shoppingSteps'

export default function Shipping() {
    const router = useRouter()
    const {redirect} = router.query;
    const {handleSubmit , control , formState : {errors } , setValue}= useForm();

    const {state, dispatch } = useContext(Store)

    // if a already logged in user exists , direct him to home page 
    const {userInfo , cart}  = state
    const {shippingData} = cart
   
    useEffect(() => {
        if (!userInfo) {
          router.push('/login?redirect=/shipping');
        }
        setValue('name' , shippingData?.name)
        setValue('address' , shippingData?.address)
        setValue('city' , shippingData?.city)
        setValue('pinCode' , shippingData?.pinCode)
        setValue('country' , shippingData?.country)
      }, []);


    const submitHandler=  ({name , address , city , pinCode , country}) => {
        
        dispatch({type : 'SAVE_SHIPPING_DATA' , payload : {name , address , city , pinCode , country} ,})
  
        Cookies.set('shippingData' , {name:name , address:address , city:city , pinCode:pinCode, country:country})
        router.push('/payment') 
 
    }   

    return (
        <Layout>
            <ShoppingSteps activeStep={1}/>
            <form onSubmit = {handleSubmit(submitHandler)}>
                <Typography component="h1" variant="h2">
                    Shipping Details
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
                    
                <ListItem>
                       
                         <Controller
                           name ="address"
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
                               id="address" 
                               label="Address" 
                               inputProps={{type : 'text'}}
                               error = {Boolean(errors.address)}
                               helperText={errors.address?
                                           errors.address.type === 'minLength' ? 'Address should be at least 2!!'             
                                           :
                                           "Address is required" 
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
                           name ="city"
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
                               id="city" 
                               label="City" 
                               inputProps={{type : 'text'}}
                               error = {Boolean(errors.city)}
                               helperText={errors.city?
                                           errors.city.type === 'minLength' ? 'City length should be at least 2!!'             
                                           :
                                           "City is required" 
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
                           name ="pinCode"
                           control ={control}
                           defaultValue=""
                           rules={{
                               required:true,
                               minLength : 5
                           }}
                           render={({field}) => (
                               <TextField 
                               fullWidth 
                               variant="outlined" 
                               id="pinCode" 
                               label="PIN Code" 
                               inputProps={{type : 'number'}}
                               error = {Boolean(errors.pinCode)}
                               helperText={errors.pinCode?
                                           errors.pinCode.type === 'minLength' ? 'PIN Code length should be at least 5!!'             
                                           :
                                           "PIN Code is required" 
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
                           name ="country"
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
                               id="country" 
                               label="country" 
                               inputProps={{type : 'text'}}
                               error = {Boolean(errors.country)}
                               helperText={errors.country?
                                           errors.country.type === 'minLength' ? 'Country length should be at least 2!!'             
                                           :
                                           "Country is required" 
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
                            Continue
                        </Button>
                    </ListItem>
                    
                </List>

            </form>

        </Layout>

    )
}
