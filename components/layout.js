import {React , useContext, useState} from 'react'
import Head from 'next/head'
import {AppBar, Container, Toolbar , Typography , Button, Badge, Menu,MenuItem,InputBase, IconButton } from '@material-ui/core'
import useStyles from '../utils/styles'
import NextLink from 'next/link'
import { Link } from '@material-ui/core'
import {Store} from '../utils/store'
import Cookies from 'js-cookie'
import {useRouter} from 'next/router'

// import SearchIcon from '@mui/icons-material/Search';

export default function Layout({children , title , description}) {
    const classes = useStyles()
    const {state , dispatch} = useContext(Store)
    const {cart ,userInfo} = state
    const [anchorEl , setAnchorEl]= useState(null)
    const router = useRouter()
    const [searchQuery , setSearchQuery] = useState('')

    const userMenuClickHandler = (e) =>{
        setAnchorEl(e.currentTarget)    
    }

    const userMenuCloseHandler = (e,redirect) =>{
        setAnchorEl(null)
        if(redirect){
            router.push(redirect)
        }
    }
    
    const logoutClickHandler = () => {
        setAnchorEl(null)
        dispatch({type:'USER_LOGOUT'} )

        // clean the cookies
        Cookies.remove('userInfo')
        Cookies.remove('cart')

        router.push('/')
    }

 
    const searchSubmitHandler = (e) =>{
        e.preventDefault()
        router.push(`/search?query=${searchQuery}`)
    }

    return (
        <div >
            <Head>
                <title>{title ? {title} : "E-commerce"}</title>
                {description &&  (
                    <meta name = "description" content={description}></meta>
                )}
            </Head>

            <AppBar className = {classes.navbar} position = "static">
                <Toolbar>
                    <NextLink href="/" passHref>
                        <Link >
                            <Typography className ={classes.brandName}>E-commerce</Typography>
                        </Link>
                    </NextLink>

                    <div>
                        <form className = {classes.searchForm} onSubmit={searchSubmitHandler} >
                            <InputBase
                                className = {classes.searchInput}
                                name="searchQuery"
                                placeholder='searchProducts'
                                onChange = {e => setSearchQuery(e.target.value)}
                            />
                            <IconButton
                                type="submit"
                                aria-label="search"
                                className = {classes.iconButton}

                            >
                                {/* <SearchIcon/> */}
                                Search
                            </IconButton>


                        </form>
                    </div>

                    <div>
                        <NextLink href="/cart" passHref>
                            <Link>
                            {cart.cartItems.length >0 ?
                             <Badge color="primary" badgeContent={cart.cartItems.length}>Cart</Badge>
                             :
                             "Cart"
                            }
                            </Link>
                        </NextLink>
                 
                        {userInfo ?
                        <>
                            <Button 
                                id="simple-menu"
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={userMenuClickHandler}
                            >
                                {userInfo.name}
                            </Button>
       
                            <Menu
                                id="simple-menu"
                                aria-labelledby="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={userMenuCloseHandler}
                                keepMounted
                            >
                            <MenuItem onClick={(e)=>userMenuCloseHandler(e,'/profile')}>Profile</MenuItem>
                            <MenuItem onClick={(e)=>userMenuCloseHandler(e,'/orderHistory')}>Order history</MenuItem>
                            {userInfo.isAdmin && <MenuItem onClick={(e)=>userMenuCloseHandler(e,'/admin/dashboard')}>Admin Dashboard  </MenuItem>}
                            <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                            </Menu>
                                
                        </>
                            :
                            <NextLink href="/login" passHref>
                                <Link>Log In</Link>
                            </NextLink>
                        }
                    </div>


                </Toolbar>
            </AppBar>
            
            <Container className = {classes.main}>
                {children}
            </Container>

            <footer className = {classes.footer}>
                <Typography>
                    All rights reserved ! Ankit-cg22
                </Typography>
            </footer>

        </div>
    )
}
