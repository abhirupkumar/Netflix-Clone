'use client';

import React, { useEffect, useState } from 'react';
import { Plan } from '@/typings';
import { User } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Razorpay from 'razorpay';
import Loader from './Loader';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

declare global {
    interface Window {
      Razorpay: any;
    }
  }

interface Props {
  selectedPlan: Plan;
  previousPlan: Plan | null;
  user: User | null,
  handleClose: () => void;
}

const initializeRazorpay = async (): Promise<any> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  }

const PaymentForm: React.FC<Props> = ({ selectedPlan, previousPlan, user, handleClose }) => {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [amount, setAmount] = useState(selectedPlan.amount);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  useEffect(() => {
    if(previousPlan != null) setAmount(selectedPlan.amount - previousPlan.amount);
  }, [])

  const handlePayment = async (e: any): Promise<void> => {
    setLoading(true)
    e.preventDefault();
    const currentUser = user;
    if(currentUser == null) return;
    const orderResponse = await createRazorpayOrder(amount);
    const orderId = orderResponse;

      try {
        const res = await initializeRazorpay();
        if (!res) {
            alert("Your are offline.... Razorpay SDK Failed to load");
            return;
          }
  
          const options = {
            key: process.env.RAZORPAY_KEY,
            amount: amount, // Amount in paise or smallest currency unit
            currency: 'INR',
            name: 'Netflix',
            description: 'Subscription Payment',
            order_id: orderId,
            image: "@/app/favicon.ico",
            handler: async function (response: any) {
              // Verify the payment with Razorpay API
                // Payment successful, update user's subscription status in Firestore
              const expiryDate = calculateExpiryDate();

              await updateSubscriptionStatus(currentUser.uid, selectedPlan, orderId, expiryDate)
              setPaymentCompleted(true);
              location.reload();
            },
            prefill: {
              email: currentUser.email,
            },
            notes: {
              planName: selectedPlan.name,
              planId: selectedPlan.id,
              userId: currentUser.uid,
            },
            theme: {
              color: '#F37254',
            },
          }

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    catch (error) {
        // Handle errors during payment process
        console.log('Payment error:', error);
        handleClose(); // Close the payment form
      }
      setLoading(false);
  };

  const createRazorpayOrder = async (amount: number): Promise<any> => {
    const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        body: JSON.stringify({ amount }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data.id;
  };

  const calculateExpiryDate = (): string => {
    const currentDate = new Date();
    const expiryDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
    return expiryDate.toISOString();
  };

  const updateSubscriptionStatus = async (
    userId: string,
    plan: Plan,
    subscriptionId: string,
    expiryDate: string
  ): Promise<void> => {
    try {
    //   const userRef = doc(db, 'subscriptions', userId);
      const userRef =  doc(db, "subscriptions", userId);
      const docSnap = await getDoc(userRef);
      //find userId in firestore and if present then update doc otherwise addDoc


      if(docSnap.exists()){
        await updateDoc(doc(db, 'subscriptions', userId), {
            subscriptionPlan: plan.name,
            subscriptionPlanId: plan.id,
            subscriptionAmount: plan.amount,
            subscriptionExpiryDate: expiryDate,
            subscriptionId,
          });
      }
      else{
        await setDoc(userRef, {
            subscriptionPlan: plan.name,
            subscriptionPlanId: plan.id,
            subscriptionAmount: plan.amount,
            subscriptionExpiryDate: expiryDate,
            subscriptionId,
          })
      }
      console.log('Subscription status updated successfully');
      // Add any further logic or redirection after successful subscription update
    } catch (error) {
      // Handle errors during subscription status update
      console.log('Subscription status update error:', error);
    }
  };

  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg pt-28">
      {paymentCompleted ? (
        <div>
          <h2 className="text-3xl mb-4">Payment Completed!</h2>
          <p className="text-xl">Thank you for your subscription.</p>
          <p className="text-xl">Just wait your would be redirected to home.</p>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl mb-4">Payment Form</h2>
          <p className="text-xl mb-4">Selected Plan: {selectedPlan.name}</p>
          <p className="text-xl mb-4">Video Quality: {selectedPlan.videoQuality}</p>
          <p className="text-xl mb-4">Resolution: {selectedPlan.resolution}</p>
          <p className="text-xl mb-4">Description: {selectedPlan.description}</p>
          <p className="text-xl mb-4">Price: INR {selectedPlan.amount}.00</p>
          <p className="text-xl mb-4">Amount Payable: INR {amount}.00</p>
          {!loading ? <>
            <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg mr-4"
            onClick={handlePayment}
          >
            Proceed to Pay
          </button>
          <button
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg"
            onClick={handleClose}
          >
            Cancel
          </button>
          </> : <Loader />}
        </div>
      )}
      </div>
  );
};

export default PaymentForm;
