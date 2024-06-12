import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
const Payment = () => {
    return (
        <div className="h-96">
             <Helmet>
        <title>Payment</title>
      </Helmet>
           <h1 className="text-center font-bold text-3xl mb-20">Payment</h1> 

           <Elements stripe={stripePromise} >
    <CheckoutForm />
  </Elements>
        </div>
    );
};

export default Payment;