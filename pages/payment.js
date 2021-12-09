import React ,{useState , useEffect,useContext } from 'react'
import {Store} from '../utils/store'
import {useRouter} from 'next/router'
import Layout from '../components/layout'
import ShoppingSteps from '../components/shoppingSteps'
import { Typography , List, ListItem ,FormControl, RadioGroup, FormControlLabel , Radio, Button} from '@material-ui/core'
import Cookies from 'js-cookie'

export default function Payment() {
    const {state , dispatch} = useContext(Store)
    const {cart:{shippingData}} = state
    const router = useRouter()
    const [paymentMethod , setPaymentMethod] = useState(null)
    useEffect(()=>{
        if(!shippingData.address ){
            router.push('/shipping')
        }else{
            setPaymentMethod(Cookies.get('paymentMethod') || '')
            // if a already selected payment method exists in cookies , load it
        }
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch({type : 'SAVE_PAYMENT_METHOD' , payload : paymentMethod})
        Cookies.set('paymentMethod' , paymentMethod)
        router.push('/placeOrder') 
    };
 
    return (
        <Layout>
            <ShoppingSteps activeStep={2} />
            <form onSubmit={submitHandler}>
                <Typography variant='h2' component='h1'>Payment method</Typography>
                <List>
                    <ListItem>
                        <FormControl component="fieldset">
                            <RadioGroup 
                                aria-label='Payment Method'
                                name="paymentMethod"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <FormControlLabel label="Paypal" value="PayPal" control={<Radio/>}/>
                                <FormControlLabel label="Stripe" value="Stripe" control={<Radio/>}/>
                                <FormControlLabel label="Cash on delivery" value="Cash on delivery" control={<Radio/>}/>

                            </RadioGroup>
                            
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <Button disabled={!paymentMethod} fullWidth type="submit" variant="contained">
                            Continue
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button fullWidth type="submit" variant="contained" onClick={() => router.push('/shipping')}>
                            Back
                        </Button>
                    </ListItem>

                </List>
            </form>
        </Layout>
    )
}
