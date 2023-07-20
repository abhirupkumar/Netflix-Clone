"use client";

import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import Loader from './Loader'
import { useRouter } from 'next/navigation';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';

function Membership () {
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleClick = async () : Promise<void> => {
        setLoading(true);
        if(user == null){
            setLoading(false);
            return;
        }
        const docRef = doc(db, "subscriptions", user.uid);
        await deleteDoc(docRef);
        router.push('/');
    }
    
    return (
        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
            <div className="space-y-2 py-4">
                <h4 className="text-lg text-[gray]">Membership & Billing</h4>
                <button
                  disabled={loading}
                className="h-10 w-3/5 whitespace-nowrap bg-gray-300 py-2 text-sm font-medium text-black shadow-md hover:bg-gray-200 md:w-4/5"
                  onClick={handleClick}
                >
                {loading ? (
                    <Loader />
                ) : (
                    'Cancel Membership'
                )}
                </button>
            </div>

            <div className="col-span-3">
                <div className="flex flex-col justify-between border-b border-white/10 py-4 md:flex-row">
                <div>
                    <p className="font-medium">{user?.email}</p>
                </div>
                <div className="md:text-right">
                    <p className="membershipLink">Change email</p>
                    <p className="membershipLink">Change password</p>
                </div>
                </div>

                <div className="flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0">
                    <div className="flex flex-1 flex-col md:text-right">
                        <p className="membershipLink">Manage payment info</p>
                        <p className="membershipLink">Add backup payment method</p>
                        <p className="membershipLink">Billing Details</p>
                        <p className="membershipLink">Change billing day</p>
                    </div>
                </div>
            </div>
      </div>
    );
}

export default Membership;