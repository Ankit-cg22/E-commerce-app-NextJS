import { Grid, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,Link, Select, MenuItem , Button, Card} from '@material-ui/core'
import React , {useContext} from 'react'
import Layout from '../components/layout'
import { Store } from '../utils/store'
import NextLink from 'next/link'
import Image from 'next/image'
import axios from 'axios'

export default function Cart() {
    const {state , dispatch} = useContext(Store)
    const {cart : {cartItems}} = state

    const updateQuantityHandler = async (item, quantity) => {
        const {data} = await axios.get(`/api/product/${item._id}`)
        if(data.stock < quantity )
        {
            window.alert("Product is out of stock ! Please check back later !")
            return 
        }
        dispatch({ type : 'CART_ADD_PRODUCT' , payload: {...item ,  quantity: quantity }})
        

    }

    const removeItemHandler =  (item)=>{
        dispatch({ type : 'CART_REMOVE_PRODUCT' , payload: item})
        // alert({item.name})
    }


    return (
        <Layout >
            <Typography componenet="h1" variant="h2">Cart</Typography>
            
            <NextLink href="/" passHref>
                <Link>
                    <Typography>Go shopping</Typography>
                </Link>
            </NextLink>


            {cartItems.length==0 ? (<Typography>No items in cart</Typography>)
            :    

            <Grid container spacing={1}>
                <Grid item md={9} xs = {11}>
                    <TableContainer fullWidth>
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Action</TableCell>
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
                                    <TableCell  align="right">
                                        <Select value={item.quantity} onChange={(e) => updateQuantityHandler(item , e.target.value )}>
                                            {[...Array(item.stock).keys()].map((x)=>(
                                                <MenuItem value={x+1} key={x+1} >
                                                    {x+1}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                    <TableCell  align="right">
                                        <Typography>
                                            ${item.price}
                                        </Typography>
                                    </TableCell>
                                    <TableCell  align="right">
                                        <Button variant="contained" onClick={()=>removeItemHandler(item)}>
                                            X
                                        </Button>
                                    </TableCell>
                                </TableRow>   
                            ))}
                        </TableBody>
                    </TableContainer>
                </Grid>

                <Grid md={3} xs ={11}>
                    <Card>
                        <Typography>
                            Total items : {cartItems.reduce((a,c) => a + c.quantity, 0)}
                        </Typography>
                        <Typography>
                            Total price : ${cartItems.reduce((a,c) => a + c.quantity*c.price, 0)}
                        </Typography>
                        <Button fullWidth variant="contained"> 
                            Checkout
                        </Button>
                    </Card>
                </Grid>

            </Grid>
        }

        </Layout>
    )
}

