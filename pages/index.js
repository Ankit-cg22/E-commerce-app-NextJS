
import Layout from '../components/layout'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core'
import { useState } from 'react'
import NextLink from 'next/link'
import db  from '../utils/dbConnect'
import axios from 'axios'
import ProductsModel from '../models/Products'
import {Rating} from '@material-ui/lab'
import CarouselItem from '../components/carouselItem'
import useStyles from '../utils/styles'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import CurrentPageProducts from './currentPageProducts'
import ReactPaginate from 'react-paginate'

export default function Home({productData1}) {
  const classes = useStyles()
  const productData = productData1.map((p) => JSON.parse(p))

  const [products , setProducts] = useState(productData)
  const [loading , setLoading] = useState(0)
  const [currentPage , setCurrentPage] = useState(1)
  
  const perPage = 3;
  const totalPages = Math.ceil(productData.length / perPage) ; 

  const endIndex = currentPage * perPage ;
  const startIndex = endIndex-perPage;

  const currentPageData = products.slice(startIndex , endIndex)

  const changePageHandler = ({selected}) => {
    setCurrentPage(selected+1)
    // 'selected' is provided by react-paginate
  }

  return (
     <Layout>
        <h1>E-commerce</h1> 

          <Slide className={classes.carousel}>
            {productData.map(item => <CarouselItem item={item}/>)} 
          </Slide>

          <CurrentPageProducts loading={loading} productData={currentPageData} />

          <div style={{margin:"10px"}}>

            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={totalPages}
              onPageChange={changePageHandler}
              containerClassName={classes.paginationBar}
              previousLinkClassName = {classes.previousButton}
              nextLinkClassName = {classes.nextButton}
              activeClassName={classes.paginationActive}
            />
          </div>

     </Layout>
  )
}

export async function getServerSideProps(){
  await db.connect()
  const products = await ProductsModel.find({}).limit(100)
  await db.disconnect()
  return {
    props : {
      productData1 : products.map((p) => JSON.stringify(p)),
    }
  }
}
