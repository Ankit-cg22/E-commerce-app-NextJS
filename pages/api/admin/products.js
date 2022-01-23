import nc from 'next-connect';
import ProductsModel from '../../../models/Products';
import { isAuth , isAdmin } from '../../../utils/auth';
import db from '../../../utils/dbConnect';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});
handler.use(isAuth , isAdmin);

handler.get(async(req , res) =>{ 
   
  await db.connect()
  const orders = await ProductsModel.find({});
  await db.disconnect()

  res.send(orders)
})



export default handler