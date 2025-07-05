import express from 'express';
import { connectDB } from './config/db.js';
import productRouter from './routes/product.route.js';

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.use('/api/products/', productRouter);

app.listen(port, () => {
  connectDB();
  console.log('Express server started on port 5000...');
});
