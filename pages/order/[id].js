import { Table , Grid, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,Link,CircularProgress, List,ListItem , Button, Card} from '@material-ui/core'
import React , {useContext , useEffect,useState , useReducer} from 'react'
import Layout from '../../components/layout'
import { Store } from '../../utils/store'
import NextLink from 'next/link'
import Image from 'next/image'

import {useRouter} from 'next/router'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios'
import Cookies from 'js-cookie'
import useStyles from '../../utils/styles'

function reducer(state, action) {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, order: action.payload, error: '' };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        state;
    }
  }

export default function OrderDetails({params}) {
    const orderID = params.id;

    const [{isPending } , paypalDispatch] = usePayPalScriptReducer()
    const router = useRouter()
    const {state } = useContext(Store)
    const {cart} = state
    const {userInfo} = state
   
    const classes= useStyles();

    const [
        { loading, error, order, },
        dispatch,
      ] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
      });
      console.log(order)
      const{orderItems , shippingAddress ,paymentMethod,totalItems,
        totalItemPrice,
        taxPrice,
        shippingPrice,
        totalPrice} = order
    
    
    useEffect(() => {
        if(!userInfo)
        {
            return router.push('/login')
        }


        const fetchOrder = async () => {
            try{
                dispatch({ type: 'FETCH_REQUEST' });
                console.log(`/api/orders/${orderID}`)
                const {data} = await axios.get(`/api/orders/${orderID}` ,
                {
                    headers: {
                        authorization : `Bearer ${userInfo.token}`
                    }
                }
                );
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            }catch(err){
                alert("error")
            }
        }

        fetchOrder()

        const loadPaypalScript = async () => {
            const { data: clientId } = await axios.get('/api/keys/paypal', {
              headers: { authorization: `Bearer ${userInfo.token}` },
            });
            paypalDispatch({
              type: 'resetOptions',
              value: {
                'client-id': clientId,
                currency: 'USD',
              },
            });
            paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });

        };
        loadPaypalScript()
    }, [])

     function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }
  function onApprove(data, actions) {
    // return actions.order.capture().then(async function (details) {
    //   try {
    //     dispatch({ type: 'PAY_REQUEST' });
    //     const { data } = await axios.put(
    //       `/api/orders/${order._id}/pay`,
    //       details,
    //       {
    //         headers: { authorization: `Bearer ${userInfo.token}` },
    //       }
    //     );
    //     dispatch({ type: 'PAY_SUCCESS', payload: data });
    //     // enqueueSnackbar('Order is paid', { variant: 'success' });
    //   } catch (err) {
    //     dispatch({ type: 'PAY_FAIL', payload: getError(err) });
    //     // enqueueSnackbar(getError(err), { variant: 'error' });
    //     alert("error")

    //   }
    // });
    alert("payment success")

  }

  function onError(err) {
    // enqueueSnackbar(getError(err), { variant: 'error' });
    alert("error")
  }

  
  
    return (
        <Layout >
            {loading ? 
                (<CircularProgress/>)
            :
      
            
            (<Grid container spacing={1}>
                <Typography component="h1" variant="h4" className={classes.orderTitle}>Order id : {order._id}</Typography>
                <Grid item md={9} xs = {11}>

                    <Card style={{marginBottom:"10px" , borderBottom:"1px solid grey" , width:"80%" }}>
                        <List>
                            <ListItem>
                                <Typography variant="h6" style={{borderBottom:"1px solid grey"}}>Shipping Address</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>
                                    {shippingAddress.name},
                                    {shippingAddress.address},
                                    {shippingAddress.city},
                                    {shippingAddress.pinCode},
                                    {shippingAddress.country}
                                </Typography>
                            </ListItem>
                        </List>
                    </Card>

                    <Card style={{marginBottom:"10px" , borderBottom:"1px solid grey" , width:"80%" }}>
                        <List>
                            <ListItem>
                                <Typography variant="h6" style={{borderBottom:"1px solid grey"}}>Payment Method</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>
                                    {paymentMethod}
                                </Typography>
                            </ListItem>
                        </List>
                    </Card>


                    <Card style={{marginBottom:"10px" , borderBottom:"1px solid grey" , width:"80%" }}>
                        <List>
                        <ListItem>
                            <Typography variant="h6" style={{borderBottom:"1px solid grey"}}>Orderd Items</Typography>
                        </ListItem>

                        <ListItem>

                        <TableContainer fullWidth>
                            <Table>

                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="center">Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderItems.map((item) => (
                                    <TableRow>
                                        <TableCell>
                                            <NextLink href={`/product/${item.slug}`} passHref>
                                                <Link>
                                                    <Image src={item.image} alt={item.name} height ={50} width={50}/>
                                                </Link>
                                            </NextLink>
                                        </TableCell>
                                        <TableCell>
                                            <NextLink href={`/product/${item.slug}`} passHref>
                                                <Link>
                                                    <Typography>{item.name}</Typography>
                                                </Link>
                                            </NextLink>
                                        </TableCell>
                                        <TableCell  align="center">
                                            <Typography>{item.quantity}</Typography>
                                        </TableCell>
                                        <TableCell  align="center">
                                            <Typography>
                                                ${item.price}
                                            </Typography>
                                        </TableCell>
                        
                                    </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        </ListItem>
                                
                        </List>

                    </Card> 
                </Grid>

                <Grid md={3} xs ={11}>
                    <Card>
                        <Typography variant="h6">Order details</Typography>
                        <hr></hr>
                        <Typography>
                            Total items : {totalItems}
                        </Typography>
                        <Typography>
                            Total item price : ${totalItemPrice}
                        </Typography>
                        <Typography>
                            Tax  : ${taxPrice}
                        </Typography>
                        <Typography>
                            Shipping cost  : ${shippingPrice}
                        </Typography>
                        <Typography>
                            <strong>Total  : ${totalPrice}</strong>
                        </Typography>
                        
                            {isPending ? (
                                <CircularProgress />
                            ) : (
                                <div >
                                <PayPalButtons
                                    createOrder={createOrder}
                                    onApprove={onApprove}
                                    onError={onError}
                                ></PayPalButtons>
                                </div>
                            )}
                  
                    </Card>
                </Grid>

            </Grid>
     )

    }
        </Layout>

        
    )
}

export async function getServerSideProps({params})
{
    return {
        props : {
            params
        }
    }
}