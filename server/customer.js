import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  emailAddress: String,
  course: String,
  date: String,
  repeat: Number,
});

export default mongoose.model('Customer', customerSchema);
