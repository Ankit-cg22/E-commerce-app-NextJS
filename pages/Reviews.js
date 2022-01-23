import React, { useEffect } from 'react'
import { useState , useRef , useContext } from 'react'
import {Rating} from '@material-ui/lab'
import { TextField, Typography ,Button } from '@material-ui/core'
import useStyles from '../utils/styles'
import { Store } from '../utils/store'
import axios from 'axios'

export default function Reviews({product}) {
    const classes = useStyles()

    const {state , dispatch } = useContext(Store)
    const userInfo = (state.userInfo)

    const [reviewStars , setReviewStars]  = useState(0);
    const [reviewText , setReviewText] =useState('')
    const [reviews , setReviews] = useState([])
    const reviewSubmitHandler = async () => {
        const newReview = {  name : userInfo.name ,stars : reviewStars , review : reviewText}
        
        try {
            const {data} =await axios.post(`/api/reviews/${product._id}` , newReview)
            
            setReviewStars(0)
            setReviewText(0);
            
            alert("Thanks for the review ! Refresh page to see changes!")

        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        setReviews(product.reviews)
    }, [])

    return (
        <div className={classes.reviewContainer}>
            

            {userInfo ?
            <>
                    <Typography variant="h4"> Submit Review </Typography>
                    <Rating name="rating" value = {reviewStars} onChange={(e) => setReviewStars(e.target.value)} />
                    <TextField 
                        fullWidth
                        rows={1}
                        variant="outlined"
                        label="Write some review .."
                        multiline
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
        
                    />
                    <Button style={{margin:'10px'}} fullWidth disabled = {!reviewText || !reviewStars} variant="contained" onClick={reviewSubmitHandler}>Submit Review</Button>
            </>

                :
                    <Typography variant="h5" style={{margin:'10px' , border : "solid 3px blue" , padding:"10px"}}>
                        Log In to write a review !  
                    </Typography>

            }

        
            <Typography variant = "h4" gutterbuttom>Reviews</Typography>

            {reviews.map((r, i) => {
                return (
                    <div key={i}>
                        <h3>{ r.name} </h3>
                        <Rating value={r.stars} readOnly/>
                        <Typography variant="h6">{r.review}</Typography>
                    </div>
                )
            })

            }
            
        </div>
    )
}
