"use client";

import { modalState, movieState } from '@/atoms/modalAtom';
import { baseUrl } from '@/constants/movie';
import { Movie } from '@/typings'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { useRecoilState } from 'recoil';

interface Props {
  netflixOriginals: Movie[]
}

const Banner = ({ netflixOriginals } : Props) => {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  const truncate = (str: string) => {
    return str.length > 250 ? str.substring(0, 250) + "..." : str;
  }

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals])

  return (
    <div className="flex flex-col space-y-2 pt-16 md:space-y-4 lg:h-[65vh] lg:justify-end">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        {(movie?.backdrop_path || movie?.poster_path) && <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          fill={true}
          object-fit="cover"
          alt="banner-image"
          priority={true}
        />}
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-6xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-xl lg:text-lg">
        {movie?.overview && truncate(movie?.overview)}
      </p>

      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black" onClick={() => {
            setCurrentMovie(movie)
            setShowModal(true)
          }}>
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" onClick={() => {
            setCurrentMovie(movie)
            setShowModal(true)
          }} /> Play
        </button>
        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            setCurrentMovie(movie)
            setShowModal(true)
          }}
        >
          More Info <HiOutlineInformationCircle className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  )
}

export default Banner