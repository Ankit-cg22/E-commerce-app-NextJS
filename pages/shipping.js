import { useRouter } from 'next/router'
import React from 'react'

export default function Shipping() {

    const router = useRouter()
    router.push('/login')

    return (
        <div>
            <h1> Shipping page </h1>
        </div>
    )
}
