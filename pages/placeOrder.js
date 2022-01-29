import { Grid, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,Link,CircularProgress, List,ListItem , Button, Card, Table} from '@material-ui/core'
import React , {useState ,useContext , useEffect } from 'react'
import Layout from '../components/layout'
import NextLink from 'next/link'
import Image from 'next/image'
import { Store } from '../utils/store'
import {useRouter} from 'next/router'
import ShoppingSteps from '../components/shoppingSteps'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function PlaceOrder() {
    const router = useRouter()

    const {state , dispatch} =  useContext(Store);    

    console.log(state);

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

        if(cartItems.length == 0)
        {
            router.push('/cart')
        }

    }, [])

     

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

                    <Card style={{marginBottom:"10px" , borderBottom:"1px solid grey" , width:"80%" }}>
                        <List>
                            <ListItem >
                                <Typography variant="h6" style={{borderBottom:"1px solid grey"}}>Shipping Address</Typography>
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

                    <Card style={{marginBottom:"10px" ,borderBottom:"1px solid grey" , width:"80%" }}>
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


                    <Card style={{ borderBottom:"1px solid grey" , width:"80%" }}>
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
                        <Button fullWidth variant="contained" onClick={handlePlaceOrderClick} > 
                            Place Order
                        </Button>

                    </Card>
                </Grid>

            </Grid>
     

        </Layout>
    )
}

  