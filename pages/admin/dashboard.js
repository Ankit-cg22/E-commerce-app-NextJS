import React,{useContext , useReducer , useEffect } from 'react'
import Layout from '../../components/layout'
import { useRouter } from 'next/router'
import { Store } from '../../utils/store'
import { Grid, List, ListItem, Paper, Typography } from '@material-ui/core'
import NextLink from 'next/link'

function reducer(state , action){
    switch(action.type){
        case 'FETCH_REQUEST' :
            return {...state , loading : true}
        case 'FETCH_SUCCESS' :
            return { ...state , loading : false , summary : action.payload}
    }
}


export default function AdminOrders() {
    const router = useRouter()
    const {state } = useContext(Store)
    const {userInfo} = state

    const [{loading , error , summary} , dispatch] = useReducer(reducer , {
        loading : true,
        summary : {salesData: []},
        error : ""
    } )

    useEffect(() => {
        if(!userInfo){
            router.push('/login')
        }

        // const fetchData = async () =>{
        //     try {
        //         // dispatch({type : 'FETCH_REQUEST' })

        //         // call for api 
        //         // const {data} = api 

        //         // dispatch({type : 'FETCH_SUCCESS' , payload : data })
        //     } catch (error) {
                
        //         alert("error")
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
                    <Paper>
                        <Typography variant="h3" component="h1">Dashboard</Typography>
                    </Paper>
                </Grid>

            </Grid>

        </Layout>
    )
}
