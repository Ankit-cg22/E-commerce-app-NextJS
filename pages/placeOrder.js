import { Grid, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,Link,CircularProgress, List,ListItem , Button, Card} from '@material-ui/core'
import React , {useContext , useEffect } from 'react'
import Layout from '../components/layout'
import NextLink from 'next/link'
import Image from 'next/image'
import { Store } from '../utils/store'
import {useRouter} from 'next/router'
import ShoppingSteps from '../components/shoppingSteps'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios'
import Cookies from 'js-cookie'

export default function PlaceOrder() {
    const [{isPending } , paypalDispatch] = usePayPalScriptReducer()
    const router = useRouter()
    const {state , dispatch} = useContext(Store)
    const {cart} = state
    const {userInfo} = state
    const {cartItems} = cart
    const {shippingData} = cart
    const {paymentMethod} = cart
    const totalItems = cartItems.reduce((a,c) => a + c.quantity, 0)
    const totalItemPrice = cartItems.reduce((a,c) => a + c.quantity*c.price, 0)
    const taxPrice = (totalItemPrice * 0.18)
    const shippingPrice = totalItemPrice > 350 ? 0 : 20
    const totalPrice = totalItemPrice+taxPrice+shippingPrice

    useEffect(() => {
        if(!paymentMethod)
        {
            router.push('/payment')
        }

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

  const handlePlaceOrderClick =async () => {
      try{
          const {data} = await axios.post(
              '/api/orders',
              {
                orderItems : cartItems,
                shippingAddress: shippingData,
                paymentMethod,
                itemsPrice: totalItemPrice,
                shippingPrice,
                taxPrice,
                totalPrice  
              },
              {
                  headers: {
                      authorization : `Bearer ${userInfo.token}`
                  }
              }
          )
          dispatch({type:'CLEAR_CART'})
          Cookies.remove('cartItems')
          router.push(`/order/${data._id}`)
      }catch(error){
          alert(error.message)
      }
  }

    return (
        <Layout >
            <ShoppingSteps activeStep={3}/>
            <Typography componenet="h1" variant="h2">Order Report</Typography>
            
            <Grid container spacing={1}>
                <Grid item md={9} xs = {11}>

                    <Card>
                        <List>
                            <ListItem>
                                <Typography variant="h6">Shipping Address</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>
                                    {shippingData.name},
                                    {shippingData.address},
                                    {shippingData.city},
                                    {shippingData.pinCode},
                                    {shippingData.country}
                                </Typography>
                            </ListItem>
                        </List>
                    </Card>

                    <Card>
                        <List>
                            <ListItem>
                                <Typography variant="h6">Payment Method</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>
                                    {paymentMethod}
                                </Typography>
                            </ListItem>
                        </List>
                    </Card>


                    <Card>
                        <Typography variant="h6">Orderd Items</Typography>
                        <TableContainer fullWidth>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartItems.map((item) => (
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
                                        <TableCell  align="right">
                                            <Typography>
                                                ${item.price}
                                            </Typography>
                                        </TableCell>
                        
                                    </TableRow>
                                ))}
                            </TableBody>
                        </TableContainer>
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
                        <Button fullWidth variant="contained" onClick={handlePlaceOrderClick} > 
                            Place Order
                        </Button>

                       
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
     

        </Layout>
    )
}

  