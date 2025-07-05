import express from 'express';
import { connectDB } from './config/db.js';
import productRouter from './routes/product.route.js';

const app = express();
app.use(express.json());

app.use('/api/products/', productRouter);

app.listen(5000, () => {
  connectDB();
  console.log('Express server started on port 5000...');
});
