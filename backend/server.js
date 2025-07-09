import express from 'express';
import { connectDB } from './config/db.js';
import productRouter from './routes/product.route.js';

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.use('/api/products/', productRouter);

const __dirname = process.cwd();
// Serve static files from the React app
app.use(express.static(__dirname + '/frontend/dist'));

// Handle React routing, return all requests to React app
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(__dirname + '/frontend/dist/index.html', (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
}

app.listen(port, () => {
  connectDB();
  console.log('Express server started on port 5000...');
});
