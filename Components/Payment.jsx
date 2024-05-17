import React, { useEffect } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
// import 'react-credit-cards/es/styles-compiled.css'
import swal from "sweetalert";
// import { useNavigate } from 'react-router-dom';
// import { ApiPost } from '../Api/Api';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import useCommonApi from '@/hooks/useCommonApi';
import { useDispatch } from 'react-redux';
import { toggleLoader } from '@/redux/userSlice';

// Replace with your actual Stripe public API key
const stripePromise = loadStripe('pk_test_51NDnaxKBpr5FioRxSNJDHv6tsZXZcusVBoaJkaGJJgfJVMS0I7HF2zPtAdfiGvIIf3vz5b8B8bAPKONgD8ATtYOB00q7eR6ivz');

function PaymentForm({ payOut, total, setIsCardFilled, orderId }) {
    const stripe = useStripe();
    const dispatch = useDispatch()
    const router = useRouter()
    const { getCount, getCartList } = useCommonApi()
    const elements = useElements();
    const secret_key = "sk_test_51NDnaxKBpr5FioRxy7N9yV5sNADvTGiJFnQHJGMMDnw3yLcoDFkV1SGv90xFwB4QUT9oAoS1ftFI1Ekjo8AA9Yzw00t5KYiXbe"
    const handleSubmit = async (event) => {
        dispatch(toggleLoader());
        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
        if (paymentMethod?.id) {
            try {
                const response = await axios.post(`https://api.stripe.com/v1/payment_intents`, {
                    amount: total * 100, // Replace with the actual amount
                    currency: 'INR', // Replace with the actual currency code
                    payment_method: paymentMethod?.id, // Pass the payment method ID as the payment source
                    payment_method_types: ["card"],
                    capture_method: "automatic",
                    confirm: true,
                    return_url: `${window.location.origin}/payment-response/${orderId}`
                },
                    {
                        headers: {
                            Authorization: `Bearer ${secret_key}`,
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    });
                if (response && response?.data?.status === "succeeded") {
                    dispatch(toggleLoader());
                    const body = {
                        params: {
                            order_master_id: orderId,
                            status: "S",
                            tran_id: paymentMethod?.id
                        }
                    }
                    const auth_token = Cookies.get("auth_token");
                    dispatch(toggleLoader());
                    axios.post(`https://infowarescripts.com/dev/e-commerce/api/order-status-update`, body, {
                        headers: {
                            Authorization: `Bearer ${auth_token}`,
                            'Content-Type': 'application/json',
                        },
                    }).then((res) => {
                        dispatch(toggleLoader());
                        router.push("/my-orders")
                        getCount()
                        getCartList()
                    });
                } else if (response && response?.data?.status === "requires_action") {
                    dispatch(toggleLoader());
                    var action = response?.data?.next_action;
                    if (action && action.type === 'redirect_to_url') {
                        window.location = action.redirect_to_url.url;
                    }
                } else {
                    dispatch(toggleLoader());
                    swal({
                        title: "Error",
                        text: 'Something went wrong',
                        icon: "error",
                    })
                }

                // Handle the clientSecret and complete the payment
            } catch (error) {
                dispatch(toggleLoader());
                swal({
                    title: "Error",
                    text: error?.response?.data?.error?.message,
                    icon: "error",
                })
            }
        } else {
            dispatch(toggleLoader());
            swal({
                title: "Error",
                text: error?.message,
                icon: "error",
            })
        }
        // }
    };

    useEffect(() => {
        if (payOut) {
            handleSubmit()
        }
    }, [payOut])

    const handleCardInputChange = (event) => {
        setIsCardFilled(event.complete);
    };

    return (
        <div>
            <div key='Payment' className='payment-sec'>
                    <h2 >Card Details</h2>
                <div className='App-payment mt-2 payment-box' style={{ border: "1px solid #dde0e1", borderRadius: "4px", padding: "16px 24px" }}>
                    <CardElement options={{
                        hidePostalCode: true,
                    }} onChange={handleCardInputChange} />
                </div>
            </div>
        </div>
    );
}


const Payment = ({ showButton, payOut, total, orderId, setIsCardFilled, orderData }) => {
    const handleToken = (token) => {
    };
    return (
        <div className="App">
            <Elements stripe={stripePromise}>
                <PaymentForm showButton={showButton} setIsCardFilled={setIsCardFilled} payOut={payOut} total={total} orderId={orderId} orderData={orderData} />
            </Elements>
        </div>
    );
};

export default Payment;