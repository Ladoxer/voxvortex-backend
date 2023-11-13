import app from './app';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;
// const MONGO_URI = process.env.MONGO_URI as string;

mongoose.connect("mongodb://127.0.0.1:27017/voxvortex").then(() => {
  console.log('Database connected...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});