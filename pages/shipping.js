import { useRouter } from 'next/router'
import {useContext} from 'react'
import {Store} from '../utils/store'

export default function Shipping() {

    const router = useRouter()

    const {state, reducer} = useContext(Store)
    const {userInfo }= state

    if(!userInfo)
    {
        router.push('/login?redirect=/shipping')
        // we make use of this redirect query in login page to redirect back to where we came from 
    }

    return (
        <div>
            <h1> Shipping page </h1>
        </div>
    )
}
