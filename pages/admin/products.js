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
            return { ...state , loading : false , products : action.payload}
    }
}


export default function AdminProducts() {
    const router = useRouter()
    const {state } = useContext(Store)
    const {userInfo} = state

    const [{loading , error , products} , dispatch] = useReducer(reducer , {
        loading : true,
        products : {},
        error : ""
    } )

    useEffect(() => {
        if(!userInfo){
            router.push('/login')
        }

        const fetchData = async () =>{
            try {
                dispatch({type : 'FETCH_REQUEST' })
                
                const {data} = await axios.get(`/api/admin/products` ,
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

    const handleDeleteClick =  async (productID) => {
        if(!window.confirm('Confirm delete !'))
        {
            return 
        }
        

        try{
            await axios.delete(`/api/admin/product/${productID}`,
            {
                headers: {
                    authorization : `Bearer ${userInfo.token}`
                }
            })
            router.push('/admin/products')
        }catch(error){
            alert(error.data?  error.data.message : error.message)
        }
    }

    
    return (
        <Layout>
            <h1>Admin  </h1>
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
                                <ListItem  button component ="a">
                                    <Typography>Orders</Typography>
                                </ListItem>
                            </NextLink>
                            <NextLink  href="/admin/products" passHref>
                                <ListItem  selected button component ="a">
                                    <Typography>Products</Typography>
                                </ListItem>
                            </NextLink>
                        </List>
                    </Paper>
                </Grid>
                <Grid item md = {9} xs ={12}>
                    <Paper>
                        <Typography variant="h3" component="h1">Products</Typography>
                        <NextLink href="/admin/product/addProduct" passHref>
                            <Button variant="contained">Add Product</Button>
                        </NextLink>
                        {loading ? 
                            <CircularProgress/>
                        :
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>NAME</TableCell>
                                            <TableCell>PRICE</TableCell>
                                            <TableCell>CATEGORY</TableCell>
                                            <TableCell>STOCK COUNT</TableCell>
                                            <TableCell>RATING</TableCell>
                                            <TableCell>ACTION</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {products.map((product) => {
                                            return (
                                                <TableRow key={product._id}>
                                                    <TableCell>{product._id.substring(20,24)}</TableCell>
                                                    <TableCell>{product.name}</TableCell>
                                                    <TableCell>${product.price}</TableCell>
                                                    <TableCell>{product.category}</TableCell>
                                                    <TableCell>{product.stock}</TableCell>
                                                    <TableCell>{product.rating}</TableCell>
                                                    <TableCell>
                                                        <NextLink href={`/admin/product/${product._id}`} >
                                                            <Button>Edit</Button>
                                                        </NextLink>
                                                        
                                                        <Button onClick={() => handleDeleteClick(product._id)}>Delete</Button>
    
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
