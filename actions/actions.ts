"use server";

// import { getProducts, Product } from '@stripe/firestore-stripe-payments';
import requests from '@/utils/requests';

export const fetchAllData = async () => {

      const [
        netflixOriginals,
        trendingNow,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,
      ] = await Promise.all([
        fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
        fetch(requests.fetchTrending).then((res) => res.json()),
        fetch(requests.fetchTopRated).then((res) => res.json()),
        fetch(requests.fetchActionMovies).then((res) => res.json()),
        fetch(requests.fetchComedyMovies).then((res) => res.json()),
        fetch(requests.fetchHorrorMovies).then((res) => res.json()),
        fetch(requests.fetchRomanceMovies).then((res) => res.json()),
        fetch(requests.fetchDocumentaries).then((res) => res.json()),
      ])
    
      return {
          netflixOriginals: netflixOriginals.results,
          trendingNow: trendingNow.results,
          topRated: topRated.results,
          actionMovies: actionMovies.results,
          comedyMovies: comedyMovies.results,
          horrorMovies: horrorMovies.results,
          romanceMovies: romanceMovies.results,
          documentaries: documentaries.results,
      }
}
