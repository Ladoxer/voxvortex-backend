import Razorpay from "razorpay";
import env from "dotenv";
env.config();

const razorpay = new Razorpay({
  key_id: 'rzp_test_NOvxLkFB5JGvn6',
  key_secret: process.env.RAZORKEY
})

export default razorpay;