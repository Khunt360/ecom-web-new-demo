// import { Box, Grid, Typography } from '@mui/material';
import { useStripe, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const stripePromise = loadStripe('pk_test_51NDnaxKBpr5FioRxSNJDHv6tsZXZcusVBoaJkaGJJgfJVMS0I7HF2zPtAdfiGvIIf3vz5b8B8bAPKONgD8ATtYOB00q7eR6ivz');

function Payment() {
    const router = useRouter()
    const auth_token = Cookies.get("auth_token");
    const stripe = useStripe();
    const [message, setMessage] = useState("")
    const { orderId, payment_intent_client_secret } = router.query
    const checkPayment = async () => {
        const { paymentIntent, error } = await stripe.retrievePaymentIntent(payment_intent_client_secret);
        if (paymentIntent && paymentIntent.status === 'succeeded') {
            setMessage({
                type: "success",
                value: paymentIntent?.last_payment_error?.message
            })
            const body = {
                params: {
                    order_master_id: orderId,
                    status: "S",
                    tran_id: paymentIntent?.id
                }
            }
            axios.post(`https://infowarescripts.com/dev/e-commerce/api/order-status-update`, body, {
                headers: {
                    Authorization: `Bearer ${auth_token}`,
                    'Content-Type': 'application/json',
                },
            })
        } else {
            setMessage({
                type: "error",
                value: paymentIntent?.last_payment_error?.message
            })
            const body = {
                params: {
                    order_master_id: orderId,
                    status: "E",
                    tran_id: paymentIntent?.id
                }
            }
            axios.post(`https://infowarescripts.com/dev/e-commerce/api/order-status-update`, body, {
                headers: {
                    Authorization: `Bearer ${auth_token}`,
                    'Content-Type': 'application/json',
                },
            })
        }
    }
    useEffect(() => {
        if (payment_intent_client_secret) {
            checkPayment()
        }
    }, [payment_intent_client_secret, stripePromise, stripe])

    return (
        <div key='Payment'>
            <div className='app-payment'>
                <h4 variant='h4' mb={4} color={`${message?.type === "error" ? "#bd3d3d" : "green"}`}>{message?.value}</h4>
                <div>
                    {message?.type === "error" ? "payment again" : "go to order page"}
                    {/* <StyledButton2 text={`${message?.type === "error" ? "payment again" : "go to order page"}`} onClick={() => { message?.type === "error" ? navigate("/cart") : navigate("/order-history") }} /> */}
                </div>
            </div>
        </div>
    )
}

const PaymentResponse = () => {

    return (
        <div>
            <Elements stripe={stripePromise}>
                <Payment />
            </Elements>
        </div>
    )
}

export default PaymentResponse