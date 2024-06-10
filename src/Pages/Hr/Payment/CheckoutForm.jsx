import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../useAxiosSecure/useAxiosSecure";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure()
  const location = useLocation()
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransectionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const price = parseInt(location.state.price);
  console.log(price);
  



    useEffect(()=>{
     if(price > 0){
      axiosSecure.post(`/create-payment-intent`, {price})
      .then(res=>{
        // console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
     }
    },[axiosSecure, price])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        toast.success("payment successful");
        setTransectionId(paymentIntent.id);

        navigate("/dashboard");
      }
    }
  };
  return (
   <div className="p-20 mx-auto">
     <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-primary w-40 mt-12 mx-auto"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      {transactionId && (
        <p className="text-green-400 text-center mt-10"> your transaction in is{transactionId}</p>
      )}
      <p className="text-red-400">{error}</p>
    </form>
   </div>
  );
};

export default CheckoutForm;
