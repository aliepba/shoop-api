import express, { Application } from 'express';
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes';

dotenv.config();

const app: Application = express();
app.use(express.json())

app.use(userRoutes)

app.listen(process.env.APP_PORT, (): void => {
  console.log('SERVER IS UP ON PORT:', process.env.APP_PORT);
});