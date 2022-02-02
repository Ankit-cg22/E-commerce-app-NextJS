import React , {useEffect , useContext,useReducer} from 'react'
import {Store} from '../utils/store'
import {useRouter} from 'next/router'
import { Table,Grid, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,Link,CircularProgress, List,ListItem , Button, Card, Tab, ListItemText} from '@material-ui/core'
import Layout from '../components/layout'
import NextLink from 'next/link'
import Image from 'next/image'
import axios from 'axios'

function reducer(state, action) {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, orders: action.payload, error: '' };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        state;
    }
  }


export default function OrderHistory() {
    const {state } = useContext(Store)
    const {userInfo} = state
    const router = useRouter()

    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        orders: [],
        error: '',
      });

    useEffect(()=>{
        if(!userInfo){
            router.push('/login')
        }

        const fetchOrders = async () => {
            try{
                dispatch({ type: 'FETCH_REQUEST' });
                
                const {data} = await axios.get(`/api/orders/history` ,
                {
                    headers: {
                        authorization : `Bearer ${userInfo.token}`
                    }
                }
                );
                console.log("data")
                console.log(data)
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            }catch(err){
                alert("error")
            }
        }

        fetchOrders()

    },[])

   
      console.log("orders")
      console.log(orders)
    return (
        <Layout >
            <Grid container spacing={1}>
                <Grid item md={3} xs = {11}>
                    <Card>
                        <List>
                            <NextLink href='/profile' passHref>
                                <ListItem button component="a">
                                    <ListItemText primary="User Profile"></ListItemText>
                                </ListItem>
                            </NextLink>
                            <NextLink href='/orderHistory' passHref>
                                <ListItem selected button component="a">
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
                                <Typography variant="h3" component = "h1">Order History</Typography>

                            </ListItem>
                            <ListItem>
                            {loading ? 
                               (<CircularProgress/>)
                                :
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Id</TableCell>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Total</TableCell>
                                                <TableCell>Paid</TableCell>
                                                <TableCell>Delivered</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orders.map((order) => {
                                                return(
                                                    <TableRow key={order._id}>
                                                        <TableCell>{order._id.substring(20,24)}</TableCell>
                                                        <TableCell>{order.createdAt}</TableCell>
                                                        <TableCell>${order.totalPrice}</TableCell>
                                                        <TableCell>{order.isPaid ? "Paid" : "Not paid"}</TableCell>
                                                        <TableCell>{order.isDelivered ? "Delivered" : "Not delivered"}</TableCell>
                                                        <TableCell>
                                                            <NextLink href={`order/${order._id}`} passHref >
                                                                <Button variant="contained">Details</Button>
                                                            </NextLink>

                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            }
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
            
      
        </Layout>

    )
}
