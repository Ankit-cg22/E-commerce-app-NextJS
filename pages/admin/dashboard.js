import React,{useContext , useReducer , useEffect } from 'react'
import Layout from '../../components/layout'
import { useRouter } from 'next/router'
import { Store } from '../../utils/store'
import { Grid, List, ListItem, Paper, Typography } from '@material-ui/core'
import NextLink from 'next/link'
import axios from 'axios'

function reducer(state , action){
    switch(action.type){
        case 'FETCH_REQUEST' :
            return {...state , loading : true}
        case 'FETCH_SUCCESS' :
            return { ...state , loading : false , summary : action.payload}
    }
}


export default function AdminDashboard() {
    const router = useRouter()
    const {state } = useContext(Store)
    const {userInfo} = state
    
    useEffect(() => {
        if(!userInfo){
            router.push('/login')
        }

        // const fetchData = async () =>{
        //     try {
        //         dispatch({type : 'FETCH_REQUEST' })
                
        //         const {data} = await axios.get(`/api/admin/products` ,
        //         {
        //             headers: {
        //                 authorization : `Bearer ${userInfo.token}`
        //             }
        //         }
        //         );

        //         dispatch({type : 'FETCH_SUCCESS' , payload : data })
        //     } catch (error) {
                
        //         alert(error.data?  error.data.message : error.message)
        //     }
        // }

        // fetchData()

    }, [])


    return (
        <Layout>
            <h1>Admin Orders </h1>
            <Grid container spacing={1}>
                <Grid item md = {3} xs ={12}>
                    <Paper>
                        <List>

                            <NextLink href="/admin/dashboard" passHref>
                                <ListItem selected button component ="a">
                                    <Typography>Dashboard</Typography>
                                </ListItem>
                            </NextLink>
                            <NextLink  href="/admin/orders" passHref>
                                <ListItem  button component ="a">
                                    <Typography>Orders</Typography>
                                </ListItem>
                            </NextLink>
                            <NextLink  href="/admin/products" passHref>
                                <ListItem  button component ="a">
                                    <Typography>Products</Typography>
                                </ListItem>
                            </NextLink>
                        </List>
                    </Paper>
                </Grid>
                <Grid item md = {9} xs ={12}>
                    <Paper style={{borderBottom:"1px solid grey" , marginBottom:"10px"}}>
                        <Typography variant="h3" component="h1">Dashboard</Typography>
                    </Paper>
                    <Paper style={{padding:"10px"}}>
                        <Typography> Welcome Admin {userInfo?.name} .</Typography>
                        <Typography> This is your dashboard .</Typography>
                        <Typography> Here you can view orders received by you .</Typography>
                        <Typography> Here you can access the products listed by you . You can add new products , remove products and edit existing products.</Typography>
                    </Paper>
                </Grid>

            </Grid>

        </Layout>
    )
}
