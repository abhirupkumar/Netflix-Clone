"use client";

import Link from 'next/link'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import Loader from './Loader'
import { AiOutlineCheck } from 'react-icons/ai'
import Table from './Table';
import { Plan } from '@/typings';
import PaymentForm from './PaymentForm';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import plans from '@/utils/data'

function Plans() {
  const { logout, user, planDetails } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[2])
  const [isBillingLoading, setBillingLoading] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [previousPlan, setPreviousPlan] = useState<Plan | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    fetchSubscribes()
    setLoading(false)
  }, [planDetails])

  const fetchSubscribes = async (): Promise<void> => {
    if (!user) return;
    const userRef =  doc(db, "subscriptions", user.uid);
    const docSnap = await getDoc(userRef);
    if(docSnap.exists()){
      if(!docSnap.data().subscriptionPlanId) return;
        for(let i=0; i<plans.length; i++){
          if(plans[i].id == docSnap.data().subscriptionPlanId){
            setPreviousPlan(plans[i])
            setSelectedPlan(plans[i])
            break;
          }
        }
    }
  }
  

  const subscribeToPlan = async () => {
    if (!user) return

    setBillingLoading(true)
    setShowPaymentForm(true);
    setBillingLoading(false)
  }

  const handlePaymentFormClose = () => {
    setShowPaymentForm(false);
  };

  if(loading) return <Loader />

  return (
    <div>
      <header className="border-b border-white/10 bg-[#141414]">
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            alt="Netflix"
            width={150}
            height={90}
            className="cursor-pointer object-contain"
          />
        </Link>
        <button
          className="text-lg font-medium hover:underline"
          onClick={logout}
        >
          Sign Out
        </button>
      </header>
      {!showPaymentForm ?
      <main className="mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
        <h1 className="mb-3 text-3xl font-medium">
          Choose the plan that's right for you
        </h1>
        <ul>
          <li className="flex items-center gap-x-2 text-lg">
            <AiOutlineCheck className="h-7 w-7 text-[#E50914]" /> Watch all you want.
            Ad-free.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <AiOutlineCheck className="h-7 w-7 text-[#E50914]" /> Recommendations
            just for you.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <AiOutlineCheck className="h-7 w-7 text-[#E50914]" /> Upgrade or cancel
            your plan anytime.
          </li>
        </ul>

        <div className="mt-4 flex flex-col space-y-5">
          <div className="flex w-full items-center justify-center self-end md:w-3/5">
            {plans.map((item) => (
                <button
                key={item.id}
                className={`planBox cursor-pointer ${
                    selectedPlan?.id === item.id ? 'opacity-100' : 'opacity-60'
                  }`}
                  onClick={() => setSelectedPlan(item)}
              >
                {item.name}
                </button>
            ))}
          </div>

          <Table plans={plans} selectedPlan={selectedPlan}  />

          {(previousPlan ==null || previousPlan.amount < selectedPlan.amount) && <button
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoading && 'opacity-60'
            }`}
            onClick={subscribeToPlan}
          >
            {isBillingLoading ? (
              <Loader />
            ) : (
              'Subscribe'
            )}
          </button>}
        </div>
      </main>
      :
        <PaymentForm selectedPlan={selectedPlan} previousPlan={previousPlan} user={user} handleClose={handlePaymentFormClose} />
      }
    </div>
  )
}

export default Plans