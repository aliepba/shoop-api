import express, { Application } from 'express';
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes';
import productRoutes  from './routes/productRoutes'
import categoryRoutes from './routes/categoryRoutes'
import orderRoutes from './routes/orderRoutes'
const path = require('path');

dotenv.config();

const app: Application = express();
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(userRoutes)
app.use('/products', productRoutes)
app.use('/category', categoryRoutes)
app.use('/order',orderRoutes)

app.listen(process.env.APP_PORT, (): void => {
  console.log('SERVER IS UP ON PORT:', process.env.APP_PORT);
});