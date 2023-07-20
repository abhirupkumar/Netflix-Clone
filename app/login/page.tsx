"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form'
import useAuth from '@/hooks/useAuth';
import Loader from '@/components/Loader';

interface Inputs {
  email: string
  password: string
}

const page = () => {
  const [login, setLogin,] = useState(false);
  const [loggedIn, setLoggedIn,] = useState(false);
  const { signIn, signUp, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  useEffect(() => {
    if(error!=null){
      setLoggedIn(false)
    }
  }, [error])
  

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
    setLoggedIn(true)
  }

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Image
        src="https://rb.gy/p2hphi"
        fill={true}
        className="-z-10 !hidden opacity-60 sm:!inline"
        object-fit="cover"
        alt="background-image"
      />

      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />
      {!loggedIn ? <form onSubmit={handleSubmit(onSubmit)} className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
  >
    <h1 className="text-4xl font-semibold">Sign In</h1>
    <div className="space-y-4">
      <label className="inline-block w-full">
        <input
          type="email"
          placeholder="Email"
          className="input"
          {...register('email', { required: true })}
        />
        {errors.email && (
          <p className="p-1 text-[13px] font-light  text-orange-500">
            Please enter a valid email.
          </p>
        )}
      </label>
      <label className="inline-block w-full">
        <input
          type="password"
          placeholder="Password"
          className="input"
          {...register('password', { required: true })}
        />
        {errors.password && (
          <p className="p-1 text-[13px] font-light  text-orange-500">
            Your password must not be empty.
          </p>
        )}
      </label>
    </div>
     
    {!loading ? <>
    <button
      className="w-full rounded bg-[#e50914] py-3 font-semibold"
      onClick={() => setLogin(true)}
    >
      Sign In
    </button>

    <div className="text-[gray]">
      New to Netflix?{' '}
      <button
        type="submit"
        className="text-white hover:underline"
        onClick={() => setLogin(false)}
      >
        Sign up now
      </button>
    </div>
    </> : <Loader />}
  </form> : <Loader />}
    </div>
  )
}

export default page