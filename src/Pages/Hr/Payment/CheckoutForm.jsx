import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";

const CheckoutForm = () => {
  const navigate = useNavigate()
  const {user}= useAuth()
  const [error, setError]= useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [transactionId, setTransectionId] = useState('')
  const stripe = useStripe();
  const elements = useElements();
//   const [carts, refetch] = useCart()
//   const totalPrice = carts.reduce((total, item)=> total + item.price, 0)



//   useEffect(()=>{
//    if(totalPrice > 0){
//     axiosSequre.post(`/create-payment-intent`, {price : totalPrice})
//     .then(res=>{
//       console.log(res.data.clientSecret);
//       setClientSecret(res.data.clientSecret);
//     })
//    }
//   },[axiosSequre, totalPrice])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setError(error.message)
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setError('')
    }

    // confirm payment
    const {paymentIntent, error : confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card : card,
          billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous'
          }
        },
      })

      if(confirmError){
        console.log('confirm error');
      }else{
        console.log('payment intent' , paymentIntent);
        if(paymentIntent.status === "succeeded"){
          toast.success('payment successful')
          setTransectionId(paymentIntent.id)

          // now save the payment i the db
          const payment = {
            email : user.email,
            price : totalPrice,
            date : new Date(),
            cartIds : carts.map(item=> item._id),
            menuItemIds : carts.map(item=> item.menuId),
            status: 'pending',
            transactionId : paymentIntent.id
          }
        const res =  await axios.post(`${import.meta.env.VITE_URL}/payments`, payment)
        console.log('payment saved',res.data);
        // refetch()
        navigate('/dashboard/paymentHistory')
        }
      }
    }
    return (
      <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn btn-secondary" type="submit" disabled={ !stripe || !clientSecret}>
        Pay
      </button>
      { transactionId && <p className="text-green-400"> your transaction in is{transactionId}</p>}
      <p className="text-red-400">{error}</p>
    </form>
    );
};

export default CheckoutForm;