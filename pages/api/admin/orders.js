import nc from 'next-connect';
import Order from '../../../models/Order';
import { isAuth , isAdmin } from '../../../utils/auth';
import db from '../../../utils/dbConnect';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});
handler.use(isAuth , isAdmin);

handler.get(async(req , res) =>{ 
   console.log("ok")
  await db.connect()
  const orders = await Order.find({})
  await db.disconnect()

  res.send(orders)
})


export default handler