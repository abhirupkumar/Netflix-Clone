"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import Membership from '@/components/Membership';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';
import Plans from '@/components/Plan';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { User } from 'firebase/auth';

interface Props{
  id: string;
  name: string;
  amount: number;
  expiry: Date;
}

const Page = () => {
    const { user, logout } = useAuth()
    const [showPlan, setShowPlan] = useState<boolean>(false)
    const [plan, setPlan] = useState<Props | null>(null)
    
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
      isSubscribed(user);
    }, [])
      
      const isSubscribed = async (user: User | null) : Promise<void> => {
        setLoading(true);
        if(user == null){
          setLoading(false);
          return;
        }
        const userRef =  doc(db, "subscriptions", user.uid);
        const docSnap = await getDoc(userRef);
        if(!docSnap.exists()) return;
        else{
          const data = docSnap.data();
          const newdate = new Date().toISOString()
          const expiryDate = data.subscriptionExpiryDate
          if(newdate > expiryDate){
            setPlan(null)
          }
          else{
            setPlan({id: data.subscriptionPlanId, name: data.subscriptionPlan, amount: data.subscriptionAmount, expiry: expiryDate})
          }
        }
        setLoading(false);
      }

    if(showPlan) return <div className='pt-32 space-y-2'>
      <button onClick={() => setShowPlan(false)} className='cursor-pointer hover:underline -mb-28 font-bold text-xl'>Cancel</button>
        <Plans />
      </div>

    if(loading) return <div className="flex pt-32 items-center"><Loader /></div>
    

  return (
    <div>
      <header className={`bg-[#141414]`}>
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            width={120}
            height={120}
            className="cursor-pointer object-contain"
            alt="image"
          />
        </Link>
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt="new-image"
            className="cursor-pointer rounded"
          />
        </Link>
      </header>

      <main className="mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
            <p className="text-xs font-semibold text-[#555]">
              {plan!=null ? `Membership will expire on ${(new Date(plan.expiry)).toDateString()}` : 'Membership Expired!'}
            </p>
          </div>
        </div>

        {plan!=null && <Membership />}

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0 items-center">
          {plan!=null && <h4 className="text-lg text-[gray]">Plan Name:</h4>}
          {/* Find the current plan */}
          {plan!=null && <div className="col-span-2 font-medium">
            {plan.name}
          </div>}
          <button onClick={() => setShowPlan(true)} className="cursor-pointer flex flex-1 text-blue-500 hover:underline md:text-right">
            Change plan
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={logout}
          >
            Sign out
          </p>
        </div>
      </main>
    </div>
  )
}

export default Page