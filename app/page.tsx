import { fetchAllData } from '@/actions/actions'
import Banner from '@/components/Banner'
import Header from '@/components/Header'
import Image from 'next/image';
import { Movie, Plan } from '../typings'
import Row from '@/components/Row';
import Page from '@/components/Page';

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

export default async function Home() {
  const {netflixOriginals,
    actionMovies,
    comedyMovies,
    documentaries,
    horrorMovies,
    romanceMovies,
    topRated,
    trendingNow} : Props = await fetchAllData();

    return (
      <Page {...{netflixOriginals,
        actionMovies,
        comedyMovies,
        documentaries,
        horrorMovies,
        romanceMovies,
        topRated,
        trendingNow,}} />
    );
  
}
