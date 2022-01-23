import React,{useContext , useReducer , useEffect ,useState} from 'react'
import Layout from '../../../components/layout'
import { useRouter } from 'next/router'
import { Store } from '../../../utils/store'
import { Button, Grid, List, ListItem, Paper, TextField, Typography } from '@material-ui/core'
import NextLink from 'next/link'
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios'
import FileBase64 from 'react-file-base64';


function reducer(state , action){
    switch(action.type){
        case 'FETCH_REQUEST' :
            return {...state , loading : true}
        case 'FETCH_SUCCESS' :
            return { ...state , loading : false}
    }
}


export default function AdminDashboard({data}) {
    const productID = JSON.parse(data)
    const router = useRouter()
    const {state } = useContext(Store)
    const {userInfo} = state
    const [image , setImage] = useState('')


    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
      } = useForm();

      const [{ loading, error }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
      });

      useEffect(()=>{
          if(!userInfo)
          {
              return router.push('/login')
          }

          const fetchData = async () => {
              try {
                  dispatch({type : 'FETCH_REQUEST'})

                  const {data} = await axios.get(`/api/admin/product/${productID}`,
                  {
                    headers: {
                        authorization : `Bearer ${userInfo.token}`
                    }
                  }) 

                  console.log("data")
                  console.log(data)

                  dispatch({type : 'FETCH_SUCCESS'})

                  setValue('name' , data.name)
                  setValue('brand' , data.brand)
                  setValue('price' , data.price)
                  setValue('category' , data.category)
                  setValue('description' , data.description)
                  setValue('slug' , data.slug)
                  setValue('count' , data.stock)
                  setValue('image' , data.image)

                

              } catch (error) {
                  alert(error.data ? error.data.message : error.message)
              }
          }

          fetchData()
      }, [])

      const submitHandler = async ({name , brand , price , category , description , slug , count ,  }) =>{
            try {
                await axios.put(`/api/admin/product/${productID}`,
                {name , brand , price , category , description , slug , count ,image:image},
                {
                    headers: {
                        authorization : `Bearer ${userInfo.token}`
                    }
                }
                )

                alert("Updated successfully ")
                router.push('/admin/products')
            } catch (error) {
                alert(error.data ? error.data.message : error.message)

            }
      }

    return (
        <Layout>
            <h1>Admin  </h1>
            <Grid container spacing={1}>
                <Grid item md = {3} xs ={12}>
                    <Paper>
                        <List>

                            <NextLink href="/admin/dashboard" passHref>
                                <ListItem  button component ="a">
                                    <Typography>Dashboard</Typography>
                                </ListItem>
                            </NextLink>
                            <NextLink  href="/admin/orders" passHref>
                                <ListItem  button component ="a">
                                    <Typography>Orders</Typography>
                                </ListItem>
                            </NextLink>
                            <NextLink  href="/admin/products" passHref>
                                <ListItem selected button component ="a">
                                    <Typography>Products</Typography>
                                </ListItem>
                            </NextLink>
                        </List>
                    </Paper>
                </Grid>
                <Grid item md = {9} xs ={12}>
                    <Paper>
                        <Typography variant="h3" component="h1">Products</Typography>
                        <List>
                            <ListItem>
                                <Typography variant="h5">Product Edit </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="h5">Product id : {productID}</Typography>
                            </ListItem>
                            <ListItem>
                                <form onSubmit={handleSubmit(submitHandler)}>
                                    <List>
                                        <ListItem>
                                            <Controller
                                                name = "name"
                                                control = {control}
                                                defaultValue=""
                                                rules={{
                                                    required : true
                                                }}
                                                render = {({field}) =>(
                                                   <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        id="name"
                                                        label="Name"
                                                        error = {Boolean(errors.name)}
                                                        helperText={errors.name ? "Name is required" : ''}
                                                        {...field}

                                                    >

                                                   </TextField>
                                                )}
                                               

                                            >

                                            </Controller>
                                        </ListItem>
                                        <ListItem>
                                            <Controller
                                                name = "brand"
                                                control = {control}
                                                defaultValue=""
                                                rules={{
                                                    required : true
                                                }}
                                                render = {({field}) =>(
                                                   <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        id="brand"
                                                        label="Brand"
                                                        error = {Boolean(errors.name)}
                                                        helperText={errors.name ? "Brand is required" : ''}
                                                        {...field}

                                                    >

                                                   </TextField>
                                                )}
                                               

                                            >

                                            </Controller>
                                        </ListItem>
                                        <ListItem>
                                            <Controller
                                                name = "price"
                                                control = {control}
                                                defaultValue=""
                                                rules={{
                                                    required : true
                                                }}
                                                render = {({field}) =>(
                                                   <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        id="price"
                                                        label="Price"
                                                        error = {Boolean(errors.name)}
                                                        helperText={errors.name ? "Price is required" : ''}
                                                        {...field}

                                                    >

                                                   </TextField>
                                                )}
                                               

                                            >

                                            </Controller>
                                        </ListItem>
                                        <ListItem>
                                            <Controller
                                                name = "category"
                                                control = {control}
                                                defaultValue=""
                                                rules={{
                                                    required : true
                                                }}
                                                render = {({field}) =>(
                                                   <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        id="category"
                                                        label="Category"
                                                        error = {Boolean(errors.name)}
                                                        helperText={errors.name ? "Category is required" : ''}
                                                        {...field}

                                                    >

                                                   </TextField>
                                                )}
                                               

                                            >

                                            </Controller>
                                        </ListItem>
                                        <ListItem>
                                            <Controller
                                                name = "description"
                                                control = {control}
                                                defaultValue=""
                                                rules={{
                                                    required : true
                                                }}
                                                render = {({field}) =>(
                                                   <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        id="description"
                                                        label="Description"
                                                        error = {Boolean(errors.name)}
                                                        helperText={errors.name ? "Description is required" : ''}
                                                        {...field}

                                                    >

                                                   </TextField>
                                                )}
                                               

                                            >

                                            </Controller>
                                        </ListItem>
                                        <ListItem>
                                            <Controller
                                                name = "slug"
                                                control = {control}
                                                defaultValue=""
                                                rules={{
                                                    required : true
                                                }}
                                                render = {({field}) =>(
                                                   <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        id="slug"
                                                        label="Slug"
                                                        error = {Boolean(errors.name)}
                                                        helperText={errors.name ? "Slug is required" : ''}
                                                        {...field}

                                                    >

                                                   </TextField>
                                                )}
                                               

                                            >

                                        </Controller>

                                        </ListItem>
                                        <ListItem>
                                            <Controller
                                                name = "count"
                                                control = {control}
                                                defaultValue=""
                                                rules={{
                                                    required : true
                                                }}
                                                render = {({field}) =>(
                                                   <TextField
                                                        variant="outlined"
                                                        fullWidth
                                                        id="count"
                                                        label="Stock Count"
                                                        error = {Boolean(errors.name)}
                                                        helperText={errors.name ? "Name is required" : ''}
                                                        {...field}

                                                    >

                                                   </TextField>
                                                )}
                                               

                                            >

                                            </Controller>
                                        </ListItem>

                                        <ListItem>
                                        <FileBase64
                                            multiple={ false }
                                            onDone={ ({base64}) => setImage(base64) } />
                                        </ListItem>

                                        <ListItem>
                                            <Button fullWidth variant="contained" type="submit">
                                                UPDATE
                                            </Button>
                                        </ListItem>

                                    </List>
                                </form>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>

            </Grid>

        </Layout>
    )
}

export async function getServerSideProps(context){
    const {params} = context

    return {
        props : {
            data : JSON.stringify(params.productID)
        }
    }
}
