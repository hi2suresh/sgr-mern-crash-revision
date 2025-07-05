import mongoose from 'mongoose';
import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'server error' });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;
  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, messsage: 'Please provide all the fields!' });
  }
  const newProduct = new Product({ name, price, image });
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    console.error(`Error in create product: ${err.messsage}`);
    res.status(500).json({ success: false, error: err.messsage });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, messsage: 'product not found!' });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (err) {
    res.status(500).json({ success: false, error: err.messsage });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, messsage: 'product deleted' });
  } catch (err) {
    res.status(404).json({ success: false, messsage: 'product not found!' });
  }
};
