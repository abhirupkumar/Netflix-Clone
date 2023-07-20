"use client";

import React, { useEffect, useState } from 'react'
import Header from './Header'
import Banner from './Banner'
import Row from './Row'
import { Movie } from '@/typings'
import useAuth from '@/hooks/useAuth'
import { useRecoilValue } from 'recoil';
import { modalState, movieState } from '@/atoms/modalAtom';
import Modal from './Modal';
import Plans from './Plan';
import Loader from './Loader';
import useList from '@/hooks/useList';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';

interface Props {
    netflixOriginals: Movie[]
    trendingNow: Movie[]
    topRated: Movie[]
    actionMovies: Movie[]
    comedyMovies: Movie[]
    horrorMovies: Movie[]
    romanceMovies: Movie[]
    documentaries: Movie[]
  }

const Page = ({netflixOriginals,
    actionMovies,
    comedyMovies,
    documentaries,
    horrorMovies,
    romanceMovies,
    topRated,
    trendingNow,
} : Props) => {

    const { loading, user } = useAuth();
    const [subscription, setSubscription] = useState<boolean | null>(null)
    const showModal = useRecoilValue(modalState);
    const movie = useRecoilValue(movieState);
    const list = useList(user?.uid)
    useEffect(() => {
      fetchSubscription()
    }, [])

    const fetchSubscription = async () => {
      if(user == null) return null;
      const userRef =  doc(db, "subscriptions", user.uid);
      const docSnap = await getDoc(userRef);
      if(!docSnap.exists()) return false;
      else{
        const data = docSnap.data();
        const newdate = new Date().toISOString()
        const expiryDate = data.subscriptionExpiryDate
        if(newdate > expiryDate){
          setSubscription(false)
        }
        else{
          setSubscription(true)
        }
      }
    }
    
    if(user == null) return <Loader />;
    if (loading || subscription === null) return <Loader />;

    if (!subscription) return <Plans />;
    console.log(subscription)

  return (
    <div className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${
        showModal && '!h-screen overflow-hidden'
      }`}>
         <Header />
         <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
          <Banner netflixOriginals={netflixOriginals} />
          <section className="md:space-y-24">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {list.length > 0 && <Row title="My List" movies={list} />}
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
          </section>
         </main>
         {showModal && <Modal />}
      </div>
  )
}

export default Page