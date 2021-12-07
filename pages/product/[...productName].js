import {useRouter} from 'next/router'
import Layout from '../../components/layout'
import data from '../../utils/data'
import ProductPage from '../../components/productDetails'
import useStyles from '../../utils/styles'

export default function ProductDetails() {
    const router = useRouter()
    const {productName} = router.query
    const classes = useStyles()
    if(!productName)
    {
        return (
            <Layout>
                <h1> Product Not Found !!</h1>
            </Layout>
        )
    }

    const product = data.products.find(p => p.slug === productName[0])

    console.log(product)
    if(!product)
    {
        return (
            <Layout>
                <h1> Product Not Found !!</h1>
            </Layout>
        )
    }

    return (
        <Layout title={product.name} description ={product.description}>
            <div class={classes.mainContentSection}>
                <ProductPage product={product}/>
            </div>
        </Layout>

    )
}
