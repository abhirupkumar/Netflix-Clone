import { fetchAllData } from '@/actions/actions'
import { Movie } from '../typings'
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
