import React,{useContext , useReducer , useEffect } from 'react'
import Layout from '../../components/layout'
import { useRouter } from 'next/router'
import { Store } from '../../utils/store'
import {Button, CircularProgress, Grid, List, ListItem, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import NextLink from 'next/link'
import axios from 'axios'
function reducer(state , action){
    switch(action.type){
        case 'FETCH_REQUEST' :
            return {...state , loading : true}
        case 'FETCH_SUCCESS' :
            return { ...state , loading : false , orders : action.payload}
    }
}


export default function AdminOrders() {
    const router = useRouter()
    const {state } = useContext(Store)
    const {userInfo} = state

    const [{loading , error , orders} , dispatch] = useReducer(reducer , {
        loading : true,
        orders : {},
        error : ""
    } )

    useEffect(() => {
        if(!userInfo){
            router.push('/login')
        }

        const fetchData = async () =>{
            try {
                dispatch({type : 'FETCH_REQUEST' })
                
                const {data} = await axios.get(`/api/admin/orders` ,
                {
                    headers: {
                        authorization : `Bearer ${userInfo.token}`
                    }
                }
                );

                dispatch({type : 'FETCH_SUCCESS' , payload : data })
            } catch (error) {
                
                alert(error.data?  error.data.message : error.message)
            }
        }

        fetchData()

    }, [])


    return (
        <Layout>
            <h1>Admin Orders </h1>
            <Grid container spacing={1}>
                <Grid item md = {3} xs ={12}>
                    <Paper>
                        <List>

                            <NextLink href="/admin/dashboard" passHref>
                                <ListItem  button component ="a">
                                    <Typography>Dashboard</Typography>
                                </ListItem>
                            </NextLink>
                            <NextLink  href="/admin/orders" passHref>
                                <ListItem selected button component ="a">
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
                        <Typography variant="h3" component="h1">Orders</Typography>

                        {loading ? 
                            <CircularProgress/>
                        :
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>USER</TableCell>
                                            <TableCell>DATE</TableCell>
                                            <TableCell>TOTAL</TableCell>
                                            <TableCell>PAID</TableCell>
                                            <TableCell>DELIVERED</TableCell>
                                            <TableCell>ACTION</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orders.map((order) => {
                                            return (
                                                <TableRow key={order._id}>
                                                    <TableCell>{order._id.substring(20,24)}</TableCell>
                                                    <TableCell>{order.user.name}</TableCell>
                                                    <TableCell>{order.createdAt}</TableCell>
                                                    <TableCell>${order.totalPrice}</TableCell>
                                                    <TableCell>{order.isPaid ? "Paid" : "Not paid"}</TableCell>
                                                    <TableCell>{order.isDelivered ? "Delivered" : "Not delivered"}</TableCell>
                                                    <TableCell>
                                                        <NextLink href={`order/${order._id}`} passHref >
                                                            <Button variant="outlined">Details</Button>
                                                        </NextLink>

                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        }

                    </Paper>
                </Grid>

            </Grid>

        </Layout>
    )
}
