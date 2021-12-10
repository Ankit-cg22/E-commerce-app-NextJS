import nc from 'next-connect';
import Order from '../../../models/Order';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/dbConnect';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});
handler.use(isAuth);
handler.post(async(req , res) =>{ 
    console.log("=S==")
    console.log(req.body)
    console.log( req.user._id,)

    await db.connect()

    const newOrder = new Order({
        ...req.body,
        user: req.user._id,
      });
      console.log(newOrder)
      const order = await newOrder.save();
    res.status(201).send(order);  
})


export default handler